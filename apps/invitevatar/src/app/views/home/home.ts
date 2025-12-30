import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from '@components/toolbar/toolbar';
import { TranslocoDirective } from '@jsverse/transloco';
import { NavigationService } from '@services/navigation.service';
import { StateService } from '@services/state.service';
import { HOME_NAV_ROUTES } from './home.routes';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    TranslocoDirective,
    ToolbarComponent,
    RouterModule,
  ],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly menuRoutes = HOME_NAV_ROUTES;
  protected readonly stateService = inject(StateService);
  protected readonly navigationService = inject(NavigationService);
}
