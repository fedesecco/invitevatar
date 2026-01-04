import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoDirective } from '@jsverse/transloco';

type ConfirmDeleteData = { label: string | null };

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [CommonModule, TranslocoDirective, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title *transloco="let t">
      {{ t('home.sections.apiKeys.dialogs.deleteTitle') }}
    </h2>
    <div class="space-y-4 px-6 pb-6" *transloco="let t">
      <p>
        {{ t('home.sections.apiKeys.dialogs.deletePrompt', { label: data.label || 'API key' }) }}
      </p>
      <div class="flex justify-end gap-3">
        <button mat-button type="button" (click)="close(false)">
          {{ t('common.cancel') }}
        </button>
        <button mat-flat-button color="warn" type="button" (click)="close(true)">
          {{ t('home.sections.apiKeys.dialogs.deleteCta') }}
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDeleteDialogComponent {
  readonly data = inject<ConfirmDeleteData>(MAT_DIALOG_DATA);
  private readonly dialogRef =
    inject<MatDialogRef<ConfirmDeleteDialogComponent>>(MatDialogRef);

  close(confirm: boolean) {
    this.dialogRef.close(confirm);
  }
}
