import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public readonly isDarkMode = signal<boolean>(
    this.getStoredThemePreference() ??
      window.matchMedia('(prefers-color-scheme: dark)').matches,
  );

  constructor() {
    effect(() => {
      const isDark = this.isDarkMode();
      document.documentElement.setAttribute(
        'data-theme',
        isDark ? 'dark' : 'light',
      );
    });
  }

  public toggleTheme() {
    this.isDarkMode.update((current) => {
      const next = !current;
      this.persistThemePreference(next);
      return next;
    });
  }

  private getStoredThemePreference(): boolean | null {
    if (typeof localStorage === 'undefined') return null;

    let storedTheme: string | null = null;
    try {
      storedTheme = localStorage.getItem('invitevatar.theme');
    } catch {
      return null;
    }
    if (!storedTheme) return null;

    if (storedTheme === 'dark') return true;
    if (storedTheme === 'light') return false;

    return null;
  }

  private persistThemePreference(isDark: boolean) {
    if (typeof localStorage === 'undefined') return;

    try {
      localStorage.setItem('invitevatar.theme', isDark ? 'dark' : 'light');
    } catch {
      /* no-op */
    }
  }
}
