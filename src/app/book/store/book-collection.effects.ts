import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, tap } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { loadBooksCompleted, loadBooksStarted } from './book-collection.actions';

@Injectable()
export class BookCollectionEffects {
  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBooksStarted),
      exhaustMap(() => this.bookApi.getAll()),
      tap({ error: () => console.log('HiHi') }),
      map(books => loadBooksCompleted({ books }))
    );
  });

  constructor(private actions$: Actions, private bookApi: BookApiService) {}
}
