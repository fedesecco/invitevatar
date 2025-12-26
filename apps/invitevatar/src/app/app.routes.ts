import { Route } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
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
    canActivate: [authGuard],
  },
  {
    path: 'auth/callback',
    loadComponent: () =>
      import('@views/auth-callback/auth-callback').then(
        (c) => c.AuthCallbackComponent
      ),
  },
];
