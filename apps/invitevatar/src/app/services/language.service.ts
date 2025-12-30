import { effect, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DEFAULT_LANG, Lang, SUPPORTED_LANGS } from '@app/shared/constants';
import { TranslocoService } from '@jsverse/transloco';
import { distinctUntilChanged, map } from 'rxjs';

const LANGUAGE_STORAGE_KEY = 'invitevatar.lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly transloco = inject(TranslocoService);

  public readonly supportedLangs = SUPPORTED_LANGS;
  public readonly activeLang = toSignal(
    this.transloco.langChanges$.pipe(
      map(this.stringToLang),
      distinctUntilChanged(),
    ),
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
      localStorage.setItem(LANGUAGE_STORAGE_KEY, this.activeLang());
    });
  }

  public setLanguage(lang: Lang) {
    if (lang === this.transloco.getActiveLang()) return;

    this.transloco.setActiveLang(lang);
  }

  /** Converts a string | null to a Lang. If string is null or invalid, the default language will be returned */
  public stringToLang(input: string | null): Lang {
    return SUPPORTED_LANGS.map((l) => l.toString()).includes(input ?? '')
      ? (input as Lang)
      : DEFAULT_LANG;
  }

  private getInitialLang(): Lang {
    const stored = this.stringToLang(
      localStorage.getItem(LANGUAGE_STORAGE_KEY),
    );
    if (stored) return stored;

    const browserLang =
      navigator.language?.toLowerCase().split('-')[0] ?? DEFAULT_LANG;
    return this.stringToLang(browserLang);
  }
}
