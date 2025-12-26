import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from '../../components/toolbar/toolbar';
import { ApiKeysSectionComponent } from './sections/api-keys-section';
import { AvatarsSectionComponent } from './sections/avatars-section';
import { SettingsSectionComponent } from './sections/settings-section';

type SectionKey = 'avatars' | 'settings' | 'api-keys';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    ToolbarComponent,
    AvatarsSectionComponent,
    SettingsSectionComponent,
    ApiKeysSectionComponent,
  ],
  template: `
    <mat-sidenav-container class="layout">
      <mat-sidenav #drawer class="side" mode="side" [opened]="true">
        <div class="side-header">
          <h3>Workspace</h3>
        </div>
        <mat-nav-list>
          <button
            mat-list-item
            [class.active]="activeSection() === 'avatars'"
            (click)="select('avatars')"
          >
            <mat-icon>smart_toy</mat-icon>
            <span>Avatars</span>
          </button>
          <button
            mat-list-item
            [class.active]="activeSection() === 'settings'"
            (click)="select('settings')"
          >
            <mat-icon>tune</mat-icon>
            <span>Settings</span>
          </button>
          <button
            mat-list-item
            [class.active]="activeSection() === 'api-keys'"
            (click)="select('api-keys')"
          >
            <mat-icon>key</mat-icon>
            <span>API Keys</span>
          </button>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <app-toolbar
          [showMenu]="true"
          (menuClicked)="drawer.toggle()"
        ></app-toolbar>

        <main class="content">
          @switch (activeSection()) { @case ('avatars') {
          <app-avatars-section /> } @case ('settings') {
          <app-settings-section /> } @case ('api-keys') {
          <app-api-keys-section /> } }
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .layout {
        height: 100vh;
        background: var(--md-sys-color-surface);
      }
      .side {
        width: 240px;
        border-right: 1px solid rgba(255, 255, 255, 0.06);
      }
      .side-header {
        padding: 1rem 1.25rem;
        font-weight: 600;
      }
      button[mat-list-item] {
        width: 100%;
        text-align: left;
        border-radius: 12px;
      }
      button[mat-list-item].active {
        background: color-mix(
          in srgb,
          var(--md-sys-color-primary) 12%,
          transparent
        );
      }
      .content {
        padding: 1rem 1.5rem 2rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly activeSection = signal<SectionKey>('avatars');

  select(section: SectionKey) {
    this.activeSection.set(section);
  }
}
