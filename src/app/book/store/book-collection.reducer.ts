import { createReducer, on } from '@ngrx/store';
import { createBookStart, loadBooksComplete } from './book-collection.actions';
import { BookCollectionSlice } from './book-collection.slice';

const initialState: BookCollectionSlice = {
  entities: []
};

export const bookCollectionReducer = createReducer(
  initialState,
  on(
    createBookStart,
    (state, action): BookCollectionSlice => {
      const nextState = { ...state };
      nextState.entities = [...nextState.entities, action.book];

      return nextState;
    }
  ),
  on(
    loadBooksComplete,
    (slice, { books }): BookCollectionSlice => {
      return {
        ...slice,
        entities: books
      };
    }
  )
);
