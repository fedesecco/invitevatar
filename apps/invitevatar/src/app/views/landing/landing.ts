import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing {
  private auth = inject(AuthService);

  isAuthenticated = this.auth.isAuthenticated;
  user = this.auth.user;

  startLogin() {
    this.auth.signInWithGoogle();
  }
}
