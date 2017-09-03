import { Location } from './location.model';

export class Filter {
  constructor(
    public location: Location,
    public distance: number,
    public rating: number) {
  }
}
