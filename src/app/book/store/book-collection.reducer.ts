import { createReducer, on } from '@ngrx/store';
import { createBookStart, loadBooksCompleted } from './book-collection.actions';
import { BookCollectionSlice } from './book-collection.slice';

const initialState: BookCollectionSlice = {
  entities: []
};

export const bookCollectionReducer = createReducer(
  initialState,

  on(
    createBookStart,
    (slice, { book }): BookCollectionSlice => ({
      ...slice,
      entities: [...slice.entities, book]
    })
  ),

  on(
    loadBooksCompleted,
    (slice, { books }): BookCollectionSlice => ({
      ...slice,
      entities: books
    })
  )
);
