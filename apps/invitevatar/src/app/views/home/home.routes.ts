import { Route } from '@angular/router';
import { Section } from '@app/shared/constants';
import { AppSection } from './exports';
import { HomeComponent } from './home';

export const HOME_NAV_ROUTES: AppSection[] = [
  {
    path: Section.invites,
    loadComponent: () =>
      import('@views/settings/settings-section').then(
        (m) => m.SettingsSectionComponent
      ),
    data: {
      icon: 'ic:baseline-mail',
      labelKey: 'home.nav.invites',
    },
  },
  {
    path: Section.avatars,
    loadComponent: () =>
      import('@views/avatars/avatars-section').then(
        (m) => m.AvatarsSectionComponent
      ),
    data: {
      icon: 'ic:baseline-smart-toy',
      labelKey: 'home.nav.avatars',
    },
  },
  {
    path: Section.settings,
    loadComponent: () =>
      import('@views/settings/settings-section').then(
        (m) => m.SettingsSectionComponent
      ),
    data: {
      icon: 'ic:baseline-tune',
      labelKey: 'home.nav.settings',
    },
  },
  {
    path: Section.apiKeys,
    loadComponent: () =>
      import('@views/api-keys/api-keys-section').then(
        (m) => m.ApiKeysSectionComponent
      ),
    data: {
      icon: 'ic:baseline-vpn-key',
      labelKey: 'home.nav.apiKeys',
    },
  },
];

const DEFAULT_HOME_PATH = HOME_NAV_ROUTES[0]?.path ?? Section.invites;

export const homeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: DEFAULT_HOME_PATH },
      ...HOME_NAV_ROUTES,
      { path: '**', pathMatch: 'full', redirectTo: DEFAULT_HOME_PATH },
    ],
  },
];
