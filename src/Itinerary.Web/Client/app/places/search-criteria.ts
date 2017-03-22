import { Location } from '../shared/places.service';

export class SearchCriteria {
  constructor(
    public location: Location,
    public distance: number,
    public rating: number) {
  }
}
