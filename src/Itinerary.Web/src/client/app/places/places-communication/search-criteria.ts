import { Location } from '../places/models';

export class SearchCriteria {
  // default location is 'Geographic center of the contiguous United States'
  private static defaultLatitude = 39.833333;
  private static defaultLongitude = -98.583333;

  constructor(
    public location: Location = new Location(SearchCriteria.defaultLatitude, SearchCriteria.defaultLongitude),
    public distance: number = 0,
    public rating: number = 0,
    public reviews: number = 0) {
  }
}
