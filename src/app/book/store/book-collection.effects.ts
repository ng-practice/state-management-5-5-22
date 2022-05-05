import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { loadBooksComplete, loadBooksStart } from './book-collection.actions';

@Injectable()
export class BookCollectionEffects {
  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBooksStart),
      exhaustMap(() => this.bookApi.getAll()),
      map(books => loadBooksComplete({ books }))
    );
  });

  constructor(private actions$: Actions, private bookApi: BookApiService) {}
}
