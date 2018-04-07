import { Autocomplete, PlaceDetails } from '@app/modules/places/models';

export class GetPlaces {
  constructor(public payload: string) {}
}

export class GetPlacesSuccess {
  constructor(public payload: Autocomplete[]) {}
}

export class SelectPlace {
  constructor(public payload: string) {}
}

export class SelectPlaceSuccess {
  constructor(public payload: PlaceDetails) {}
}
