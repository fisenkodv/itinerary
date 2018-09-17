import { ViewMode } from '@app/modules/places/state/places.state';

export class GetPlaces {
  static readonly type = '[places] get places';
  constructor() {}
}

export class ChangeViewMode {
  static readonly type = '[places] change view mode';
  constructor(public payload: ViewMode) {}
}

export class GetPlaceDetails {
  static readonly type = '[places] get place details';
  constructor(public payload: string) {}
}
