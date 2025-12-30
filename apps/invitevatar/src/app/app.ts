import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageService } from '@services/language.service';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  // Instantiate language service early to apply persisted language preference.
  private readonly languageService = inject(LanguageService);
}
