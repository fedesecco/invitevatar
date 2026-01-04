import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { ApiKeysService } from '@app/services/api-keys.service';

@Component({
  selector: 'app-api-keys-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslocoDirective],
  templateUrl: './api-keys-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiKeysSectionComponent {
  private readonly fb = inject(FormBuilder);
  private readonly apiKeys = inject(ApiKeysService);

  readonly form = this.fb.nonNullable.group({
    apiKey: ['', [Validators.required, Validators.minLength(10)]],
    label: [''],
  });

  readonly saving = signal(false);
  readonly saved = signal(false);
  readonly errorMessage = signal<string | null>(null);

  constructor() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        if (this.saved()) this.saved.set(false);
        if (this.errorMessage()) this.errorMessage.set(null);
      });
  }

  async saveApiKey() {
    this.form.markAllAsTouched();
    this.saved.set(false);
    this.errorMessage.set(null);

    if (this.form.invalid) return;

    const { apiKey, label } = this.form.getRawValue();
    this.saving.set(true);

    try {
      await this.apiKeys.saveKey({ apiKey, label: label?.trim() || null });
      this.saved.set(true);
      this.form.reset({ apiKey: '', label: '' });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Could not save API key.';
      this.errorMessage.set(message);
      console.error('Failed to save API key', error);
    } finally {
      this.saving.set(false);
    }
  }
}
