// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/skip';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/takeUntil';

// import { Injectable } from '@angular/core';
// import { Actions, Effect, toPayload } from '@ngrx/effects';
// import { Action } from '@ngrx/store';
// import { Observable } from 'rxjs/Observable';
// import { empty } from 'rxjs/observable/empty';
// import { of } from 'rxjs/observable/of';

// import { PlacesService } from '../../places/index';

// import * as Filter from '../actions/filter';

// @Injectable()
// export class FilterEffects {

//   @Effect()
//   public search$: Observable<Action> = this.actions$
//     .ofType(Filter.SEARCH)
//     .debounceTime(300)
//     .map(toPayload)
//     .switchMap(query => {
//       if (query === '') {
//         return empty();
//       }

//       const nextSearch$ = this.actions$.ofType(book.SEARCH).skip(1);

//       return this.googleBooks.searchBooks(query)
//         .takeUntil(nextSearch$)
//         .map(books => new book.SearchCompleteAction(books))
//         .catch(() => of(new book.SearchCompleteAction([])));
//     });

// constructor(private actions$: Actions, private googleBooks: GoogleBooksService) { }
// }
