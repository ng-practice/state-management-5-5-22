import { createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Book } from '../models';
import { bookFeatureName, BookFeatureState } from './book.feature';

const adapter = createEntityAdapter<Book>({ selectId: book => book.isbn });

const bookFeature = createFeatureSelector<BookFeatureState>(bookFeatureName);
const bookCollectionSlice = createSelector(bookFeature, feature => feature.bookCollection);

export const { selectAll: bookCollection } = adapter.getSelectors(bookCollectionSlice);

export const bookByIsbn = (isbn: string) =>
  createSelector(bookCollection, books => {
    const found = books.find(book => book.isbn === isbn);

    return !!found ? { ...found } : null;
  });
