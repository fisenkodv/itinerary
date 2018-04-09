import { GooglePlacesAutocomplete, GooglePlacesPlace } from '@app/modules/places/models';

export class GetPlaces {
  static readonly type = '[autocomplete] get places';
  constructor(public payload: string) {}
}

export class GetPlacesSuccess {
  static readonly type = '[autocomplete] get places success';
  constructor(public payload: GooglePlacesAutocomplete[]) {}
}

export class SelectPlace {
  static readonly type = '[autocomplete] select place';
  constructor(public payload: string) {}
}

export class SelectPlaceSuccess {
  static readonly type = '[autocomplete] select place success';
  constructor(public payload: GooglePlacesPlace) {}
}
