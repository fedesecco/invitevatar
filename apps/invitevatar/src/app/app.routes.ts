import { Route } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { AuthCallbackComponent } from './views/auth-callback/auth-callback';
import { HomeComponent } from './views/home/home';
import { Landing } from './views/landing/landing';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Landing,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'auth/callback',
    component: AuthCallbackComponent,
  },
];
