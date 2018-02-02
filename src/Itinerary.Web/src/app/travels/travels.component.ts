import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'travels',
  templateUrl: 'travels.component.html',
  styleUrls: ['travels.component.scss']
})
export class TravelsComponent {
  public places = [
    { rows: 1, name: 'Russia' },
    { rows: 2, name: 'Saint Petersburg' },
    { rows: 1, name: 'Moscow' },
    { rows: 1, name: 'NY' },
    { rows: 1, name: 'Prague' },
    { rows: 1, name: 'Thailand' },
    { rows: 1, name: 'San Francisco' },
    { rows: 1, name: 'Las Vegas' },
    { rows: 1, name: 'Chicago' },
    { rows: 2, name: 'Detroit' },
    { rows: 1, name: 'Portage' },
    { rows: 1, name: 'Kalamazoo' }
  ];

  public showPlace(place: any) {
    return true;
  }

  public getPlaceFileName(name: string): string {
    return `//source.unsplash.com/1600x900/?${name}`;
  }
}
