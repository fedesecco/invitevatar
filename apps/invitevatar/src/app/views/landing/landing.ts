import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToolbarComponent } from '@app/components/toolbar/toolbar';
import { NavigationService } from '@app/services/navigation.service';
import { Section } from '@app/shared/constants';
import { TranslocoDirective } from '@jsverse/transloco';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [TranslocoDirective, ToolbarComponent],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing {
  private navigation = inject(NavigationService);
  protected auth = inject(AuthService);

  protected onCtaClick() {
    this.navigation.goToSection(Section.avatars);
  }
}
