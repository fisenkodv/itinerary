import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { SetDistance, SetLocation, SetRating, SetReviews } from './filter.actions';
import { FilterState } from './filter.state';

describe('Filter', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ imports: [NgxsModule.forRoot([FilterState])] }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('it should set location', () => {
    store.dispatch(new SetLocation({ latitude: 10, longitude: 10 }));
    store.selectOnce(state => state.filter.location).subscribe(location => {
      expect(location.latitude).toBe(10);
      expect(location.longitude).toBe(10);
    });
  });

  it('it should set distance', () => {
    store.dispatch(new SetDistance(100));
    store.selectOnce(state => state.filter.distance).subscribe(distance => {
      expect(distance).toBe(100);
    });
  });

  it('it should set rating', () => {
    store.dispatch(new SetRating(5));
    store.selectOnce(state => state.filter.rating).subscribe(rating => {
      expect(rating).toBe(5);
    });
  });

  it('it should set reviews', () => {
    store.dispatch(new SetReviews(50));
    store.selectOnce(state => state.filter.reviews).subscribe(reviews => {
      expect(reviews).toBe(50);
    });
  });
});
