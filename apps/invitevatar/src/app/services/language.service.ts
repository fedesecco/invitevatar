import { effect, inject, Injectable, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Lang, SUPPORTED_LANGS } from '@app/shared/constants';
import { TranslocoService } from '@jsverse/transloco';
import { map } from 'rxjs';

const LANGUAGE_STORAGE_KEY = 'invitevatar.lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly transloco = inject(TranslocoService);

  public readonly supportedLangs = SUPPORTED_LANGS;
  public readonly activeLang = toSignal(
    this.transloco.langChanges$.pipe(map(this.stringToLang)),
    {
      initialValue: this.getInitialLang(),
    },
  );

  constructor() {
    const initialLang = this.activeLang();
    if (initialLang !== this.transloco.getActiveLang()) {
      this.transloco.setActiveLang(initialLang);
    }

    effect(() => {
      const lang = this.activeLang();
      untracked(() => {
        if (!lang) return;
        try {
          localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
        } catch {
          /* no-op */
        }
      });
    });
  }

  public setLanguage(lang: Lang) {
    if (lang === this.transloco.getActiveLang()) return;

    this.transloco.setActiveLang(lang);
  }

  private getInitialLang(): Lang {
    const stored = this.getStoredLanguage();
    if (stored) return stored;

    const browserLang =
      navigator.language?.toLowerCase().split('-')[0] ?? Lang.en;
    return this.stringToLang(browserLang);
  }

  private stringToLang(input: string | null): Lang {
    return SUPPORTED_LANGS.map((l) => l.toString()).includes(input ?? '')
      ? (input as Lang)
      : Lang.en;
  }

  private getStoredLanguage(): Lang | null {
    try {
      return this.stringToLang(localStorage.getItem(LANGUAGE_STORAGE_KEY));
    } catch {
      return null;
    }
  }
}
