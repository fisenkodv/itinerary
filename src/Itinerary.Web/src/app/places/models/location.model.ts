// default location is 'Geographic center of the contiguous United States'
export const USGeoCenterLatitude = 39.833333;
export const USGeoCenterLongitude = -98.583333;

export class Location {

  constructor(public latitude: number, public longitude: number) {
  }

  public get isDefault(): boolean {
    return this.latitude === USGeoCenterLatitude &&
      this.longitude === USGeoCenterLongitude;
  }
}
