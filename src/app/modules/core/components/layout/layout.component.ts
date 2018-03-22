import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  moduleId: module.id,
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.scss']
})
export class LayoutComponent {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
  }
}
