import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-api-keys-section',
  standalone: true,
  imports: [TranslocoDirective],
  templateUrl: './api-keys-section.html',
  styleUrl: './api-keys-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiKeysSectionComponent {}
