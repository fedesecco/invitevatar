import { Route } from '@angular/router';
import { Landing } from './views/landing/landing';
import { AuthCallbackComponent } from './views/auth-callback/auth-callback';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Landing,
  },
  {
    path: 'auth/callback',
    component: AuthCallbackComponent,
  },
];
