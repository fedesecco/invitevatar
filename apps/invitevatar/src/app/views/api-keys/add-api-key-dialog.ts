import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoDirective } from '@jsverse/transloco';
import { ApiKeysService } from '@app/services/api-keys.service';

@Component({
  selector: 'app-add-api-key-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoDirective,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <h2 mat-dialog-title *transloco="let t">
      {{ t('home.sections.apiKeys.dialogs.addTitle') }}
    </h2>
    <form
      class="space-y-4 px-6 pb-6"
      [formGroup]="form"
      (ngSubmit)="save()"
      *transloco="let t"
    >
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>{{ t('home.sections.apiKeys.form.apiKeyLabel') }}</mat-label>
        <input
          matInput
          type="password"
          formControlName="apiKey"
          autocomplete="off"
          placeholder="{{ t('home.sections.apiKeys.form.apiKeyPlaceholder') }}"
        />
        <mat-error
          *ngIf="form.controls.apiKey.invalid && form.controls.apiKey.touched"
        >
          {{ t('home.sections.apiKeys.form.apiKeyError') }}
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>{{ t('home.sections.apiKeys.form.label') }}</mat-label>
        <input
          matInput
          type="text"
          formControlName="label"
          placeholder="{{ t('home.sections.apiKeys.form.labelPlaceholder') }}"
        />
        <mat-hint>{{ t('home.sections.apiKeys.form.optional') }}</mat-hint>
      </mat-form-field>

      <div class="flex justify-end gap-3">
        <button mat-button type="button" (click)="close()">
          {{ t('common.cancel') }}
        </button>
        <button mat-flat-button color="primary" type="submit" [disabled]="saving()">
          <span *ngIf="!saving()">
            {{ t('home.sections.apiKeys.form.saveCta') }}
          </span>
          <span *ngIf="saving()" class="animate-pulse">
            {{ t('home.sections.apiKeys.form.saving') }}
          </span>
        </button>
      </div>

      <p *ngIf="errorMessage()" class="text-sm text-[var(--mat-sys-error)]">
        {{ errorMessage() }}
      </p>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddApiKeyDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly apiKeys = inject(ApiKeysService);
  private readonly dialogRef = inject(MatDialogRef<AddApiKeyDialogComponent>);

  readonly form = this.fb.nonNullable.group({
    apiKey: ['', [Validators.required, Validators.minLength(10)]],
    label: [''],
  });

  readonly saving = signal(false);
  readonly errorMessage = signal<string | null>(null);

  async save() {
    this.form.markAllAsTouched();
    this.errorMessage.set(null);
    if (this.form.invalid) return;

    const { apiKey, label } = this.form.getRawValue();
    this.saving.set(true);
    try {
      await this.apiKeys.saveKey({ apiKey, label: label?.trim() || null });
      this.dialogRef.close('saved');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Could not save API key.';
      this.errorMessage.set(message);
      console.error('Failed to save API key', error);
    } finally {
      this.saving.set(false);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
