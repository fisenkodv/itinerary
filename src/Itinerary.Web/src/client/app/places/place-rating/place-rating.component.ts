import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'place-rating',
  templateUrl: 'place-rating.component.html',
  styleUrls: ['place-rating.component.css']
})
export class PlaceRatingComponent {
  public stars: string[];

  private star_border = 'star_border';
  private star_half = 'star_half';
  private star_fill = 'star';
  private ratingValue: number;

  @Input()
  get rating(): number {
    return this.ratingValue;
  }

  set rating(value: number) {
    this.ratingValue = value || 0;
    this.stars = [];
    for (let index = 1; index <= 5; index++) {
      if (this.ratingValue >= index) {
        this.stars.push(this.star_fill);
      } else {
        const diff = Math.abs(this.ratingValue - index);
        this.stars.push(diff >= 0.5 && diff < 1 ? this.star_half : this.star_border);
      }
    }
  }
}
