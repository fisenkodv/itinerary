import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';

import * as layout from '../../state/layout.actions';
import { LayoutState } from '@app/modules/core/state/layout.state';

@Component({
  moduleId: module.id,
  selector: 'app-app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(LayoutState.showSidenav)
  public showSidenav$: Observable<boolean>;

  constructor(private store: Store) {}

  openSidenav() {
    this.store.dispatch(new layout.OpenSidenav());
  }

  closeSidenav() {
    this.store.dispatch(new layout.CloseSidenav());
  }

  openLink(link: string) {
    window.open(link, '_blank');
    this.closeSidenav();
  }
}
