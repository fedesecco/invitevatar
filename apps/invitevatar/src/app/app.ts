import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './components/toolbar/toolbar';

@Component({
  imports: [RouterModule, ToolbarComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

}
