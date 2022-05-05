import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookCollectionSlice } from './book-collection.slice';
import { bookFeatureName } from './book.feature';

const bookFeature = createFeatureSelector<{ bookCollection: BookCollectionSlice }>(bookFeatureName);
const bookCollectionSlice = createSelector(bookFeature, feature => feature.bookCollection);

export const bookCollection = createSelector(bookCollectionSlice, slice => slice.entities);

export const bookByIsbn = (isbn: string) =>
  createSelector(bookCollection, books => books.find(book => book.isbn === isbn));
