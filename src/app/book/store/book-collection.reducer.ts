import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Book } from '../models';
import {
  bookCreationActions,
  bookDeletionActions,
  booksLoadingActions,
  bookUpdateActions
} from './book-collection.actions';

const adapter = createEntityAdapter<Book>({ selectId: book => book.isbn });

export const bookCollectionReducer = createReducer(
  adapter.getInitialState(),

  on(bookCreationActions.creationSucceeded, (slice, { book }) => adapter.addOne(book, slice)),

  on(bookDeletionActions.deletionSucceeded, (slice, { isbn }) => adapter.removeOne(isbn || '', slice)),

  on(bookUpdateActions.updateSucceeded, (slice, { book }) => adapter.setOne(book, slice)),

  on(booksLoadingActions.loadingSucceeded, (slice, { books }) => adapter.setAll(books, slice))
);
