import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  inject,
  input,
} from '@angular/core';
import { AuthButtonComponent } from '@components/auth-button/auth-button';
import { TranslocoDirective } from '@jsverse/transloco';
import { StateService } from '@services/state.service';
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
  protected readonly stateService = inject(StateService);

  public readonly showMenuToggle = input(false, {
    transform: booleanAttribute,
  });
}
