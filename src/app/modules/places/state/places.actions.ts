import { Place } from '@app/modules/places/models';
import { ViewMode } from '@app/modules/places/state/places.state';

export class GetPlaces {
  static readonly type = '[places] get places';
  constructor() {}
}

export class GetPlacesSuccess {
  static readonly type = '[places] get places success';
  constructor(public payload: Place[]) {}
}

export class ChangeViewMode {
  static readonly type = '[places] change view mode';
  constructor(public payload: ViewMode) {}
}

export class GetPlaceDetails {
  static readonly type = '[places] get place details';
  constructor(public payload: string) {}
}

export class GetPlaceDetailsSuccess {
  static readonly type = '[places] get place details success';
  constructor(public payload: Place) {}
}
