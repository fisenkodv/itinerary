import { Location } from '../shared/models';

export class SearchCriteria {
  constructor(
    public location: Location,
    public distance: number,
    public rating: number,
    public reviews: number) {
  }
}
