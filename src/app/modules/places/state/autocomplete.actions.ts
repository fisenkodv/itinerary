import { Autocomplete } from '@app/modules/places/models';

export class GetAutocomplete {
  constructor(public payload: string) {}
}

export class AutocompleteSuccess {
  constructor(public payload: Autocomplete[]) {}
}
