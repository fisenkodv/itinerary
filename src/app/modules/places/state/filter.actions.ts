import { Location } from '@app/modules/places/models';

export class SetLocation {
  static readonly type = '[filter] set location';
  constructor(public payload: Location) {}
}

export class SetDistance {
  static readonly type = '[filter] set distance';
  constructor(public payload: number) {}
}

export class SetRating {
  static readonly type = '[filter] set rating';
  constructor(public payload: number) {}
}

export class SetReviews {
  static readonly type = '[filter] set reviews';
  constructor(public payload: number) {}
}
