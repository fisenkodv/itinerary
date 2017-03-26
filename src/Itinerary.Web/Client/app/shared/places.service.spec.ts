import { TestBed, inject } from '@angular/core/testing';
import { PlacesService } from './places.service';

describe('PlacesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlacesService]
    });
  });

  it('should ...', inject([PlacesService], (service: PlacesService) => {
    expect(service).toBeTruthy();
  }));
});
