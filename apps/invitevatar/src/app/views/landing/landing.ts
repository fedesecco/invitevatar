import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [TranslocoDirective],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  isAuthenticated = this.auth.isAuthenticated;
  user = this.auth.user;

  async ngOnInit() {
    await this.auth.ready();
    if (this.auth.isAuthenticated()) {
      await this.router.navigateByUrl('/home');
    }
  }

  protected onCtaClick() {
    this.router.navigateByUrl('/home');
  }
}
