import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import './operators';
import { Config } from './shared/config/env.config';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
  }
}
