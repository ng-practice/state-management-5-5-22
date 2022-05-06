import { createFeatureSelector, createSelector } from '@ngrx/store';
import { bookFeatureName, BookFeatureState } from './book.feature';

const bookFeature = createFeatureSelector<BookFeatureState>(bookFeatureName);
const bookCollectionSlice = createSelector(bookFeature, feature => feature.bookCollection);

export const bookCollection = createSelector(bookCollectionSlice, slice => slice.entities);

export const bookByIsbn = (isbn: string) =>
  createSelector(bookCollection, books => {
    const found = books.find(book => book.isbn === isbn);

    return !!found ? { ...found } : null;
  });
