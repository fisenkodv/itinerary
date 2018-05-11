import { Component, Input } from '@angular/core';

import { Place } from '../../models';

@Component({
  selector: 'app-place-item',
  templateUrl: 'place-item.component.html',
  styleUrls: ['./place-item.component.scss']
})
export class PlaceItemComponent {
  @Input() place: Place;

  public getCategoriesText() {
    const numberOfCategories = this.place.categories.length;
    let categories = '';
    if (numberOfCategories) {
      categories = this.place.categories[0];
      if (numberOfCategories > 1) {
        categories += '...';
      }
    }
    return categories;
  }

  public getCategoriesTooltipText() {
    return this.place.categories.join(', ');
  }
}
