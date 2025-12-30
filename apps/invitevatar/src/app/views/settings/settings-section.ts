import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-settings-section',
  standalone: true,
  imports: [TranslocoDirective],
  templateUrl: './settings-section.html',
  styleUrl: './settings-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsSectionComponent {}
