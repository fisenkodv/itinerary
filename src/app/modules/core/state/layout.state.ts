import { State, Action, StateContext, Selector } from '@ngxs/store';
import { OpenSidenav, CloseSidenav } from './layout.actions';

export interface LayoutStateModel {
  showSidenav: boolean;
}

@State<LayoutStateModel>({
  name: 'layout',
  defaults: { showSidenav: true }
})
export class LayoutState {
  @Selector()
  public static showSidenav(state: LayoutStateModel): boolean {
    return state.showSidenav;
  }

  @Action(OpenSidenav)
  openSidenav({ patchState }: StateContext<LayoutStateModel>) {
    patchState({ showSidenav: true });
  }

  @Action(CloseSidenav)
  closeSidenav({ patchState }: StateContext<LayoutStateModel>) {
    patchState({ showSidenav: false });
  }
}
