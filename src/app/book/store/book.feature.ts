import { ActionReducerMap } from '@ngrx/store';
import { bookCollectionReducer } from './book-collection.reducer';
import { BookCollectionSlice } from './book-collection.slice';

export const bookFeatureName = 'book';

export interface BookFeatureState {
  bookCollection: BookCollectionSlice;
}

export const bookFeatureReducers: ActionReducerMap<BookFeatureState> = {
  bookCollection: bookCollectionReducer
};
