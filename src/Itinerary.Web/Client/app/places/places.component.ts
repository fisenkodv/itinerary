import { Component, OnInit } from '@angular/core';

import { Place, Location, PlacesService } from '../shared/places.service';

@Component({
  selector: 'places',
  templateUrl: 'places.component.html',
  styleUrls: ['places.component.scss']
})

export class PlacesComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public zoom: number;

  constructor(private placeseService: PlacesService) {
  }

  ngOnInit() {
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    this.setCurrentPosition();
  }

  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        this.placeseService.search(this.latitude, this.longitude, 20, 5)
          .subscribe(next => {
            //debugger;
          });
      });
    }
  }
}
