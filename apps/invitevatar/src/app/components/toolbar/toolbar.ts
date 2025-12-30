import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  inject,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthButtonComponent } from '@components/auth-button/auth-button';
import { LanguagePickerComponent } from '@components/language-picker/language-picker';
import { TranslocoDirective } from '@jsverse/transloco';
import { StateService } from '@services/state.service';
import { ThemeService } from '@services/theme.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    AuthButtonComponent,
    LanguagePickerComponent,
    TranslocoDirective,
  ],
  templateUrl: './toolbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  protected readonly themeService = inject(ThemeService);
  protected readonly stateService = inject(StateService);
  protected readonly router = inject(Router);

  public readonly showMenuToggle = input(false, {
    transform: booleanAttribute,
  });
}
