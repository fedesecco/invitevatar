import { Route } from '@angular/router';
import { Section } from '@app/shared/constants';
import { HomeComponent } from './home';

export const homeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: Section.invites },
      {
        path: Section.invites,
        loadComponent: () =>
          import('@views/settings/settings-section').then(
            (m) => m.SettingsSectionComponent
          ),
      },
      {
        path: Section.avatars,
        loadComponent: () =>
          import('@views/avatars/avatars-section').then(
            (m) => m.AvatarsSectionComponent
          ),
      },
      {
        path: Section.settings,
        loadComponent: () =>
          import('@views/settings/settings-section').then(
            (m) => m.SettingsSectionComponent
          ),
      },
      {
        path: Section.apiKeys,
        loadComponent: () =>
          import('@views/api-keys/api-keys-section').then(
            (m) => m.ApiKeysSectionComponent
          ),
      },
      { path: '**', pathMatch: 'full', redirectTo: Section.invites },
    ],
  },
];
