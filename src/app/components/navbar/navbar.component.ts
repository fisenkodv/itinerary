import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

//import { Store } from '@ngrx/store';

//import * as fromPlaces from '../places/redux/index';
//import { IAppState } from '@app/state/app.state';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent {
  public showProgressBar: Observable<boolean>;

  constructor(
    //private store: Store<IAppState>
  ) {
    //this.showProgressBar = this.store.select(fromPlaces.getLoading);
  }

  public signout() {
    return;
  }
}
