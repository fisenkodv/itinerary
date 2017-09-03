import { Location } from './location.model';

export class PlaceDetails {
  constructor(
    public name: string,
    public rating: number,
    public reviews: number,
    public categories: string[],
    public url: string,
    public imageUrl: string,
    public location: Location) {
  }
}
