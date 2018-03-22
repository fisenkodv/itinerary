import { Component, EventEmitter, Output } from '@angular/core';

//import { Store } from '@ngrx/store';

//import * as fromPlaces from '../places/redux/index';
//import { IAppState } from '@app/state/app.state';

@Component({
  moduleId: module.id,
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss']
})
export class ToolbarComponent {

  @Output() openMenu = new EventEmitter();
  //public showProgressBar: Observable<boolean>;

  constructor(
    //private store: Store<IAppState>
  ) {
    //this.showProgressBar = this.store.select(fromPlaces.getLoading);
  }

  // public signout() {
  //   return;
  // }
}
