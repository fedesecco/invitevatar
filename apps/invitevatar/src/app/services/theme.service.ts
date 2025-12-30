import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public readonly isDarkMode = signal<boolean>(window.matchMedia('(prefers-color-scheme: dark)').matches);

  constructor() {
    effect(() => {
      const isDark = this.isDarkMode();
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    });
  }

  public toggleTheme() {
    this.isDarkMode.update((current) => !current);
  }
}
