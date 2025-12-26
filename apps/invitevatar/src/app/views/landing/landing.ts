import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarComponent } from '@app/components/toolbar/toolbar';
import { NavigationService } from '@app/services/navigation.service';
import { Section } from '@app/shared/constants';
import { TranslocoDirective } from '@jsverse/transloco';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [TranslocoDirective, ToolbarComponent],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private navigation = inject(NavigationService);

  isAuthenticated = this.auth.isAuthenticated;
  user = this.auth.user;

  async ngOnInit() {
    await this.auth.ready();
    if (this.auth.isAuthenticated()) {
      await this.navigation.goToSection(Section.avatars);
    }
  }

  protected onCtaClick() {
    this.navigation.goToSection(Section.avatars);
  }
}
