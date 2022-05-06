import { EntityState } from '@ngrx/entity';
import { Book, bookNa } from '../models';
import { bookCreationActions } from './book-collection.actions';
import { bookCollectionReducer } from './book-collection.reducer';

describe(bookCollectionReducer.name, () => {
  describe('When a book is created', () => {
    it('adds the book to the state', () => {
      const state: EntityState<Book> = { entities: {}, ids: [] };
      const book = bookNa();
      const action = bookCreationActions.creationSucceeded({ book });

      const result = bookCollectionReducer(state, action);

      expect(result.entities[book.isbn]).toEqual(book);
    });
  });
});
