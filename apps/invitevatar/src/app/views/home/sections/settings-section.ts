import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-settings-section',
  standalone: true,
  imports: [TranslocoDirective],
  template: `
    <section class="section" *transloco="let t">
      <h2>{{ t('home.sections.settings.title') }}</h2>
      <p>{{ t('home.sections.settings.description') }}</p>
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
export class SettingsSectionComponent {}
