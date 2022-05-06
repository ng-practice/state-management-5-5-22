import { createReducer, on } from '@ngrx/store';
import {
  bookCreationActions,
  bookDeletionActions,
  booksLoadingActions,
  bookUpdateActions
} from './book-collection.actions';
import { BookCollectionSlice } from './book-collection.slice';

const initialState: BookCollectionSlice = {
  entities: []
};

export const bookCollectionReducer = createReducer(
  initialState,

  on(
    bookCreationActions.creationSucceeded,
    (slice, { book }): BookCollectionSlice => ({
      ...slice,
      entities: [...slice.entities, book]
    })
  ),

  on(
    bookDeletionActions.deletionSucceeded,
    (slice, { isbn }): BookCollectionSlice => ({
      ...slice,
      entities: slice.entities.filter(book => book.isbn !== isbn)
    })
  ),

  on(
    bookUpdateActions.updateSucceeded,
    (slice, { book }): BookCollectionSlice => ({
      ...slice,
      entities: slice.entities.map(bookExisting => (bookExisting.isbn !== book.isbn ? bookExisting : book))
    })
  ),

  on(
    booksLoadingActions.loadingSucceeded,
    (slice, { books }): BookCollectionSlice => ({
      ...slice,
      entities: books
    })
  )
);
