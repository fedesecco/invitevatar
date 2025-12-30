import { effect, inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Section } from '@app/shared/constants';
import { AppSection } from '@app/views/home/exports';
import { HOME_NAV_ROUTES } from '@app/views/home/home.routes';
import { filter, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly router = inject(Router);
  private readonly _activeSection = signal<AppSection | null>(
    this.urlToAppSection(this.router.url),
  );
  public readonly activeSection = this._activeSection.asReadonly();

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => this.urlToAppSection(event.url)),
      )
      .subscribe((section) => this._activeSection.set(section));

    effect(() =>
      console.debug(
        `[NavigationService] activeSection changed: ${this.activeSection()?.path}`,
      ),
    );
  }

  public goToSection(section: Section): Promise<boolean> {
    return this.router.navigateByUrl(`/${section}`);
  }

  public urlToAppSection(url = this.router.url): AppSection | null {
    const [, candidate] = url.split('/');
    return HOME_NAV_ROUTES.find((s) => s.path === candidate) ?? null;
  }
}
