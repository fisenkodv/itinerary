import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { OpenSidenav, CloseSidenav } from './layout.actions';
import { LayoutState } from './layout.state';

describe('Layout', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ imports: [NgxsModule.forRoot([LayoutState])] }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('it opens side navigation panel', () => {
    store.dispatch(new OpenSidenav());
    store.selectOnce(state => state.layout.showSidenav).subscribe(showSidenav => {
      expect(showSidenav).toBe(true);
    });
  });

  it('it closes side navigation panel', () => {
    store.dispatch(new CloseSidenav());
    store.selectOnce(state => state.layout.showSidenav).subscribe(showSidenav => {
      expect(showSidenav).toBe(false);
    });
  });
});
