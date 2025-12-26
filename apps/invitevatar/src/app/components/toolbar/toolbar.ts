import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { AuthButtonComponent } from '../auth-button/auth-button';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [AuthButtonComponent, TranslocoDirective],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  @Input() showMenu = false;
  @Output() menuClicked = new EventEmitter<void>();
  private themeService = inject(ThemeService);

  isDarkMode = this.themeService.isDarkMode;

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  openMenu() {
    this.menuClicked.emit();
  }
}
