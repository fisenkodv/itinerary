import { Component } from '@angular/core';
import { Select, Store } from 'ngxs';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../state/app.state';
import * as layout from '../../state/layout.actions';

@Component({
  moduleId: module.id,
  selector: 'app-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @Select((state: AppState) => state.layout.showSidenav)
  public showSidenav$: Observable<boolean>;

  constructor(private store: Store) {}

  openSidenav() {
    this.store.dispatch(new layout.OpenSidenav());
  }

  closeSidenav() {
    this.store.dispatch(new layout.CloseSidenav());
  }
}
