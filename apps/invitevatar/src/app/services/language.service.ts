import { effect, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AvailableLangs, TranslocoService } from '@jsverse/transloco';

const LANGUAGE_STORAGE_KEY = 'invitevatar.lang';
const FALLBACK_LANG = 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly transloco = inject(TranslocoService);
  private readonly supportedLangs = this.langDefinitionToStringArray(
    this.transloco.getAvailableLangs(),
  );
  private readonly activeLang = toSignal(this.transloco.langChanges$, {
    initialValue: this.resolveInitialLang(),
  });

  constructor() {
    const initialLang = this.activeLang();
    if (initialLang !== this.transloco.getActiveLang()) {
      this.transloco.setActiveLang(initialLang);
    }

    effect(() => {
      const lang = this.activeLang();
      if (!lang || !this.isSupported(lang)) return;
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      } catch {
        /* no-op */
      }
    });
  }

  public setLanguage(lang: string) {
    if (!this.isSupported(lang)) return;
    if (lang === this.transloco.getActiveLang()) return;

    this.transloco.setActiveLang(lang);
  }

  private resolveInitialLang(): string {
    const stored = this.getStoredLanguage();
    if (stored && this.isSupported(stored)) return stored;

    const browserLang = navigator.language?.toLowerCase().split('-')[0] ?? null;
    if (browserLang && this.isSupported(browserLang)) return browserLang;

    return FALLBACK_LANG;
  }

  private getStoredLanguage(): string | null {
    try {
      return localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch {
      return null;
    }
  }

  private isSupported(lang: string): boolean {
    return this.supportedLangs.includes(lang);
  }

  private langDefinitionToStringArray(langs: AvailableLangs): string[] {
    return langs.map((lang) => (typeof lang === 'string' ? lang : lang.id));
  }
}
