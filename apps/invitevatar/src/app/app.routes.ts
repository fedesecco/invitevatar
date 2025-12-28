import { Route } from '@angular/router';
import { Landing } from '@views/landing/landing';

export const appRoutes: Route[] = [
  {
    path: 'landing',
    component: Landing,
  },
  {
    path: '',
    loadChildren: () =>
      import('@views/home/home.routes').then((m) => m.homeRoutes),
  },
  {
    path: '**',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
];
