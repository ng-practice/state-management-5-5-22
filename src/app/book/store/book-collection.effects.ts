import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, tap } from 'rxjs';
import { BookApiService } from '../book-api.service';
import {
  bookCreationActions,
  bookDeletionActions,
  booksLoadingActions,
  bookUpdateActions
} from './book-collection.actions';

@Injectable()
export class BookCollectionEffects {
  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(booksLoadingActions.loadingStarted),
      exhaustMap(() => this.bookApi.getAll()),
      tap({ error: () => console.log('HiHi') }),
      map(books => booksLoadingActions.loadingSucceeded({ books }))
    );
  });

  createBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(bookCreationActions.creationStarted),
      exhaustMap(({ book }) => this.bookApi.create(book)),
      map(book => bookCreationActions.creationSucceeded({ book }))
    );
  });

  deleteBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(bookDeletionActions.deletionStarted),
      exhaustMap(({ isbn }) =>
        this.bookApi.delete(isbn || '').pipe(
          tap(() => this.router.navigateByUrl('/')),
          map(() => bookDeletionActions.deletionSucceeded({ isbn }))
        )
      )
    );
  });

  updateBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(bookUpdateActions.updateStarted),
      exhaustMap(({ book }) => this.bookApi.update(book.isbn, book)),
      map(book => bookUpdateActions.updateSucceeded({ book }))
    );
  });

  navigateToBookDetails$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(bookUpdateActions.updateSucceeded, bookCreationActions.creationSucceeded),
        tap(({ book }) => this.router.navigateByUrl(`/books/${book.isbn}`))
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router, private bookApi: BookApiService) {}
}
