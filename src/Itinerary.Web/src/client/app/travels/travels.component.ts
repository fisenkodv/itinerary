import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'travels',
  templateUrl: 'travels.component.html',
  styleUrls: ['travels.component.css']
})
export class TravelsComponent {
  public places = [
    { rows: 2, name: 'Saratov' },
    { rows: 1, name: 'Prague' },
    { rows: 1, name: 'Thailand' },
    { rows: 1, name: 'Moscow' },
    { rows: 1, name: 'Boston' },
    { rows: 2, name: 'Volgograd' },
    { rows: 1, name: 'NY' },
    { rows: 1, name: 'LasVegas' },
    { rows: 1, name: 'Chicago' },
    { rows: 2, name: 'Detroit' },
    { rows: 1, name: 'Tampa' },
    { rows: 1, name: 'Lansing' },
    { rows: 1, name: 'Linevo' }
  ];

  public showPlace(place: any) {
    return true;
  }

  public getPlaceFileName(name: string): string {
    let imageNumber = 1;
    for (let index = 0; index < name.length; index++) {
      imageNumber += name.charCodeAt(index);
    }
    return `//unsplash.it/1024/768/?image=${imageNumber}`;
  }
}
