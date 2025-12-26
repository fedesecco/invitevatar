import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [TranslocoDirective],
  template: `
    <ng-container *transloco="let t">
      <button class="auth-btn" type="button" (click)="onClick()">
        @if (auth.isAuthenticated()) {
        <span class="avatar-circle">{{ initials(auth.user()?.email) }}</span>
        <span>{{ auth.user()?.email }}</span>
        <span class="action">{{ t('auth.actions.signOut') }}</span>
        } @else {
        <span class="action">{{ t('auth.actions.loginGoogle') }}</span>
        }
      </button>
    </ng-container>
  `,
  styles: [
    `
      .auth-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: transparent;
        color: inherit;
        padding: 0.5rem 0.75rem;
        border-radius: 9999px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .auth-btn:hover {
        border-color: rgba(255, 255, 255, 0.4);
        background: rgba(255, 255, 255, 0.08);
      }
      .action {
        font-weight: 600;
      }
      .avatar-circle {
        display: inline-flex;
        width: 28px;
        height: 28px;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.15);
        font-size: 0.8rem;
        text-transform: uppercase;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthButtonComponent {
  auth = inject(AuthService);

  onClick() {
    if (this.auth.isAuthenticated()) {
      this.auth.signOut();
    } else {
      this.auth.signInWithGoogle();
    }
  }

  initials(email?: string | null) {
    if (!email) return '?';
    const [name] = email.split('@');
    return name.slice(0, 2);
  }
}
