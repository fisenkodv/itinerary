export class PlaceDetails {
  constructor(
    public name: string,
    public rating: number,
    public reviews: number,
    public categories: string[],
    public url: string,
    public imgUrl: string,
    public location: Location) {
  }
}
