import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-avatars-section',
  standalone: true,
  imports: [],
  template: `
    <section class="section">
      <h2>Avatars</h2>
      <p>Avatar management coming soon.</p>
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
