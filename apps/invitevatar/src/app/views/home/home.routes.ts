import { Route } from '@angular/router';
import { HomeComponent } from './home';

export const homeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'avatars' },
      {
        path: 'avatars',
        loadComponent: () =>
          import('@views/avatars/avatars-section').then(
            (m) => m.AvatarsSectionComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('@views/settings/settings-section').then(
            (m) => m.SettingsSectionComponent
          ),
      },
      {
        path: 'api-keys',
        loadComponent: () =>
          import('@views/api-keys/api-keys-section').then(
            (m) => m.ApiKeysSectionComponent
          ),
      },
    ],
  },
];
