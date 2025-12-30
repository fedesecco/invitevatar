import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Lang } from '@app/shared/constants';
import { TranslocoDirective } from '@jsverse/transloco';
import { LanguageService } from '@services/language.service';

const LANGUAGE_ICONS: Record<string, string> = {
  en: 'circle-flags:gb',
  it: 'circle-flags:it',
};

@Component({
  selector: 'app-language-picker',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, TranslocoDirective],
  templateUrl: './language-picker.html',
  styleUrl: './language-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguagePickerComponent {
  protected readonly languageService = inject(LanguageService);

  protected languageIcon(lang: Lang): string {
    return LANGUAGE_ICONS[lang] ?? 'solar:globe-2-bold-duotone';
  }

  protected selectLanguage(lang: Lang) {
    this.languageService.setLanguage(lang);
  }
}
