import { Route } from '@angular/router';
import { Landing } from '@views/landing/landing';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Landing,
  },
  {
    path: 'home',
    loadComponent: () =>
      import('@views/home/home').then((c) => c.HomeComponent),
  },
  {
    path: 'auth/callback',
    loadComponent: () =>
      import('@views/auth-callback/auth-callback').then(
        (c) => c.AuthCallbackComponent
      ),
  },
];
