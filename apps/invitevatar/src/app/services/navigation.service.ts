import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Section } from '@app/shared/constants';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private router = inject(Router);

  goToSection(section: Section): Promise<boolean> {
    return this.router.navigateByUrl(`/home/${section}`);
  }
}
