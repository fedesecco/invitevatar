import { Data, Route } from '@angular/router';

export interface SectionData extends Data {
  icon: string;
  labelKey: string;
}

export interface AppSection extends Route {
  data: SectionData;
}
