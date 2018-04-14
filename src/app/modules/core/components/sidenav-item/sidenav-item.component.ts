import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-nav-item',
  templateUrl: 'sidenav-item.component.html',
  styleUrls: ['sidenav-item.component.scss']
})
export class SidenavItemComponent {
  @Input() icon = '';
  @Input() hint = '';
  @Input() routerLink: string | any[] = '/';
  @Output() navigate = new EventEmitter();
}
