import { Location } from '@app/modules/places/models';

export class SetLocation {
  constructor(public payload: Location) {}
}

export class SetDistance {
  constructor(public payload: number) {}
}

export class SetRating {
  constructor(public payload: number) {}
}

export class SetReviews {
  constructor(public payload: number) {}
}