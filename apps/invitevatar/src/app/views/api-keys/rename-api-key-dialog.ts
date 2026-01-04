import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoDirective } from '@jsverse/transloco';
import { ApiKeysService } from '@app/services/api-keys.service';

type RenameDialogData = { id: string; currentLabel: string | null };

@Component({
  selector: 'app-rename-api-key-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoDirective,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <h2 mat-dialog-title *transloco="let t">
      {{ t('home.sections.apiKeys.dialogs.renameTitle') }}
    </h2>
    <form
      class="space-y-4 px-6 pb-6"
      [formGroup]="form"
      (ngSubmit)="save()"
      *transloco="let t"
    >
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>{{ t('home.sections.apiKeys.form.label') }}</mat-label>
        <input
          matInput
          type="text"
          formControlName="label"
          maxlength="80"
        />
        <mat-hint>{{ t('home.sections.apiKeys.form.optional') }}</mat-hint>
        <mat-error
          *ngIf="form.controls.label.invalid && form.controls.label.touched"
        >
          {{ t('home.sections.apiKeys.form.labelError') }}
        </mat-error>
      </mat-form-field>

      <div class="flex justify-end gap-3">
        <button mat-button type="button" (click)="close()">
          {{ t('common.cancel') }}
        </button>
        <button mat-flat-button color="primary" type="submit" [disabled]="saving()">
          <span *ngIf="!saving()">
            {{ t('home.sections.apiKeys.dialogs.renameCta') }}
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
export class RenameApiKeyDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly apiKeys = inject(ApiKeysService);
  private readonly dialogRef = inject(MatDialogRef<RenameApiKeyDialogComponent>);
  private readonly data = inject<RenameDialogData>(MAT_DIALOG_DATA);

  readonly form = this.fb.nonNullable.group({
    label: [this.data.currentLabel ?? '', [Validators.required, Validators.minLength(1)]],
  });

  readonly saving = signal(false);
  readonly errorMessage = signal<string | null>(null);

  async save() {
    this.form.markAllAsTouched();
    this.errorMessage.set(null);
    if (this.form.invalid) return;

    const { label } = this.form.getRawValue();
    this.saving.set(true);
    try {
      await this.apiKeys.rename(this.data.id, label.trim());
      this.dialogRef.close('renamed');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Could not rename API key.';
      this.errorMessage.set(message);
      console.error('Failed to rename API key', error);
    } finally {
      this.saving.set(false);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
