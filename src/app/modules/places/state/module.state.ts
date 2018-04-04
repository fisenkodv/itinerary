import { PlacesState, PlacesStateModel } from './places.state';
import { FilterState } from './filter.state';
import { AppState } from '@app/modules/core/state/app.state';

export class ModuleState extends AppState {
  places: PlacesStateModel;
}

export const states = [PlacesState, FilterState];
