import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../../../state/reducers';
import * as layout from '../../state/actions/layout';

@Component({
  moduleId: module.id,
  selector: 'app-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public showSidenav$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
  }

  openSidenav() {
    this.store.dispatch(new layout.OpenSidenav());
  }

  closeSidenav() {
    this.store.dispatch(new layout.CloseSidenav());
  }
}
