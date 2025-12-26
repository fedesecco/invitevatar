import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';

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
  error: string | null = null;

  async ngOnInit() {
    try {
      // If already authenticated, just leave the callback page.
      if (this.auth.isAuthenticated()) {
        await this.router.navigateByUrl('/home');
        return;
      }
      await this.auth.handleCallbackFromUrl(window.location.href);
      await this.router.navigateByUrl('/home');
    } catch (err) {
      this.error =
        err instanceof Error
          ? err.message
          : this.transloco.translate('authCallback.genericError');
    }
  }
}
