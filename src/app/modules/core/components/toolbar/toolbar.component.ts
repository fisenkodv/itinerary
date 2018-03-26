import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss']
})
export class ToolbarComponent {
  @Output() openMenu = new EventEmitter();
  //public showProgressBar: Observable<boolean>;

  constructor() {
    //this.showProgressBar = this.store.select(fromPlaces.getLoading);
  }
}
