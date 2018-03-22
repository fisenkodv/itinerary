import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-nav-item',
  templateUrl: 'nav-item.component.html',
  styleUrls: ['nav-item.component.scss']
})
export class NavItemComponent {
  @Input() icon = '';
  @Input() hint = '';
  @Input() routerLink: string | any[] = '/';
  @Output() navigate = new EventEmitter();
}
