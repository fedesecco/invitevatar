import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Section } from '@app/shared/constants';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { AuthService } from '@services/auth.service';
import { NavigationService } from '@services/navigation.service';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [TranslocoDirective],
  template: `
    <section class="auth-callback" *transloco="let t">
      <p>{{ t('authCallback.signingIn') }}</p>
      @if (error) {
      <p class="error">
        {{ t('authCallback.error', { error }) }}
      </p>
      }
    </section>
  `,
  styles: [
    `
      .auth-callback {
        min-height: 60vh;
        display: grid;
        place-items: center;
        color: inherit;
      }
      .error {
        color: #ffb4b4;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCallbackComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private transloco = inject(TranslocoService);
  private navigation = inject(NavigationService);
  error: string | null = null;

  async ngOnInit() {
    try {
      // If already authenticated, just leave the callback page.
      if (this.auth.isAuthenticated()) {
        await this.navigation.goToSection(Section.avatars);
        return;
      }
      await this.auth.handleCallbackFromUrl(window.location.href);
      await this.navigation.goToSection(Section.avatars);
    } catch (err) {
      this.error =
        err instanceof Error
          ? err.message
          : this.transloco.translate('authCallback.genericError');
    }
  }
}
