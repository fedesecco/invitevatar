import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  inject,
  input,
} from '@angular/core';
import { AuthButtonComponent } from '@components/auth-button/auth-button';
import { TranslocoDirective } from '@jsverse/transloco';
import { ThemeService } from '@services/theme.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [AuthButtonComponent, TranslocoDirective],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  protected readonly themeService = inject(ThemeService);

  public readonly showMenuToggle = input(false, {
    transform: booleanAttribute,
  });

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
