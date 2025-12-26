import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from '@app/components/toolbar/toolbar';
import { AuthService } from '@app/services/auth.service';
import { ApiKeysSectionComponent } from '@app/views/api-keys/api-keys-section';
import { AvatarsSectionComponent } from '@app/views/avatars/avatars-section';
import { SettingsSectionComponent } from '@app/views/settings/settings-section';
import { TranslocoDirective } from '@jsverse/transloco';

type SectionKey = 'avatars' | 'settings' | 'api-keys';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    AvatarsSectionComponent,
    SettingsSectionComponent,
    ApiKeysSectionComponent,
    TranslocoDirective,
    ToolbarComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly authService = inject(AuthService);

  protected readonly activeSection = signal<SectionKey>('avatars');

  select(section: SectionKey) {
    this.activeSection.set(section);
  }
}
