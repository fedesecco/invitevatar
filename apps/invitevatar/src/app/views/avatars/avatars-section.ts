import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-avatars-section',
  standalone: true,
  imports: [TranslocoDirective],
  templateUrl: './avatars-section.html',
  styleUrl: './avatars-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarsSectionComponent {}
