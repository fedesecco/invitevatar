import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="auth-callback">
      <p>Signing you in…</p>
      @if (error) {
        <p class="error">Auth failed: {{ error }}</p>
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
        err instanceof Error ? err.message : 'Could not complete sign-in';
    }
  }
}
