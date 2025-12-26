import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-api-keys-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section">
      <h2>API Keys</h2>
      <p>API keys and integrations will appear here.</p>
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
export class ApiKeysSectionComponent {}
