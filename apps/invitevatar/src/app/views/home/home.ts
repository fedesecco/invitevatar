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
import { TranslocoDirective } from '@jsverse/transloco';
import { ApiKeysSectionComponent } from '@views/home/sections/api-keys-section';
import { AvatarsSectionComponent } from '@views/home/sections/avatars-section';
import { SettingsSectionComponent } from '@views/home/sections/settings-section';

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
