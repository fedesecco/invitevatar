import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-avatars-section',
  standalone: true,
  imports: [TranslocoDirective],
  template: `
    <section class="section" *transloco="let t">
      <h2>{{ t('home.sections.avatars.title') }}</h2>
      <p>{{ t('home.sections.avatars.description') }}</p>
    </section>
  `,
  styles: [
    `
      .section {
        padding: 1.5rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarsSectionComponent {}
