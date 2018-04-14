import { Component } from '@angular/core';
import { VERSION } from 'environments/version';

@Component({
  moduleId: module.id,
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.scss']
})
export class FooterComponent {
  public version = VERSION;
}
