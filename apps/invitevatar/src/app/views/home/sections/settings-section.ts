import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-settings-section',
  standalone: true,
  imports: [],
  template: `
    <section class="section">
      <h2>Settings</h2>
      <p>Settings will live here.</p>
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
