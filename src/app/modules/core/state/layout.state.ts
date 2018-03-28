import { State, Action, StateContext } from '@ngxs/store';
import { OpenSidenav, CloseSidenav } from './layout.actions';

export interface LayoutStateModel {
  showSidenav: boolean;
}

@State<LayoutStateModel>({
  name: 'layout',
  defaults: { showSidenav: false },
})
export class LayoutState {
  @Action(OpenSidenav)
  openSidenav( { getState, setState }: StateContext<LayoutStateModel>) {
    setState({ ...getState(), showSidenav: true });
  }

  @Action(CloseSidenav)
  closeSidenav({ getState, setState }: StateContext<LayoutStateModel>) {
    setState({ ...getState(), showSidenav: false });
  }
}
