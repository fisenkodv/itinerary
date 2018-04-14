import { GooglePlacesAutocomplete, GooglePlacesPlace } from '@app/modules/places/models';

export class GetAutocomplete {
  static readonly type = '[autocomplete] get autocomplete';
  constructor(public payload: string) {}
}

export class GetAutocompleteSuccess {
  static readonly type = '[autocomplete] get autocomplete success';
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
