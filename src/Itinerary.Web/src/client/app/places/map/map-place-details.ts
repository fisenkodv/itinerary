import { PlaceDetails } from '../models/index';

export class MapPlaceDetails extends PlaceDetails {
  constructor(
    public isSelected: boolean,
    public wasSelected: boolean,
    place: PlaceDetails) {
    super(place.name, place.rating, place.reviews, place.categories, place.url, place.imgUrl, place.location);
  }

  public get iconUrl(): string {
    const color = this.wasSelected || this.isSelected ? 'blue' : 'red';
    return `/assets/icon/map/generic-${color}-small.png`;
  }

  public get opacity(): number {
    return this.isSelected ? 1.0 : this.wasSelected ? 0.7 : 0.5;
  }

  public getBase(): PlaceDetails {
    return new PlaceDetails(this.name, this.rating, this.reviews, this.categories, this.url, this.imgUrl, this.location);
    ;
  }
}
