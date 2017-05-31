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
    { rows: 1, name: 'StPetersburg' },
    { rows: 2, name: 'Volgograd' },
    { rows: 1, name: 'NY' },
    { rows: 1, name: 'LasVegas' },
    { rows: 1, name: 'Chicago' }
  ];

  public showPlace(place: any) {
    return true;
  }
}
