import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoDirective } from '@jsverse/transloco';
import { ApiKeyRow, ApiKeysService } from '@app/services/api-keys.service';
import { AddApiKeyDialogComponent } from './add-api-key-dialog';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog';
import { RenameApiKeyDialogComponent } from './rename-api-key-dialog';

@Component({
  selector: 'app-api-keys-section',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './api-keys-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiKeysSectionComponent implements OnInit {
  private readonly apiKeys = inject(ApiKeysService);
  private readonly dialog = inject(MatDialog);

  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly rows = signal<ApiKeyRow[]>([]);
  readonly displayedColumns = ['label', 'provider', 'createdAt', 'actions'];
  readonly isEmpty = computed(() => !this.loading() && this.rows().length === 0);

  ngOnInit() {
    this.loadKeys();
  }

  async loadKeys() {
    this.loading.set(true);
    this.errorMessage.set(null);
    try {
      const data = await this.apiKeys.list();
      this.rows.set(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Could not load API keys.';
      this.errorMessage.set(message);
      console.error('Failed to load API keys', error);
    } finally {
      this.loading.set(false);
    }
  }

  openAddDialog() {
    const ref = this.dialog.open(AddApiKeyDialogComponent, {
      width: '420px',
      autoFocus: true,
    });
    ref.afterClosed().pipe(takeUntilDestroyed()).subscribe((result) => {
      if (result === 'saved') {
        this.loadKeys();
      }
    });
  }

  renameKey(row: ApiKeyRow) {
    const ref = this.dialog.open(RenameApiKeyDialogComponent, {
      width: '360px',
      data: { id: row.id, currentLabel: row.label },
    });
    ref.afterClosed().pipe(takeUntilDestroyed()).subscribe((result) => {
      if (result === 'renamed') {
        this.loadKeys();
      }
    });
  }

  confirmDelete(row: ApiKeyRow) {
    const ref = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '360px',
      data: { label: row.label ?? row.provider },
    });
    ref.afterClosed().pipe(takeUntilDestroyed()).subscribe(async (confirmed) => {
      if (!confirmed) return;
      this.loading.set(true);
      try {
        await this.apiKeys.delete(row.id);
        await this.loadKeys();
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : 'Could not delete API key.';
        this.errorMessage.set(message);
        console.error('Failed to delete API key', error);
      } finally {
        this.loading.set(false);
      }
    });
  }
}
