import { Component, Input } from '@angular/core';

@Component({
  selector: 'place-rating',
  templateUrl: 'place-rating.component.html',
  styleUrls: ['place-rating.component.scss']
})

export class PlaceRatingComponent {
  private star_border = 'star_border';
  private star_half = 'star_half';
  private star = 'star';

  private ratingValue: number;
  public stars: string[];

  @Input()
  get rating(): number {
    return this.ratingValue;
  }
  set rating(value: number) {
    this.ratingValue = value || 0;
    this.stars = [];
    for (let index = 1; index <= 5; index++) {
      if (this.ratingValue >= index) {
        this.stars.push(this.star);
      } else {
        const diff = Math.abs(this.ratingValue - index);
        this.stars.push(diff >= 0.5 && diff < 1 ? this.star_half : this.star_border);
      }
    }
  }

  constructor() {
  }
}
