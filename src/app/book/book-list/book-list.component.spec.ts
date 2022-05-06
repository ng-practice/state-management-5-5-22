import { byTestId, createComponentFactory } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';
import { BookCardComponent } from '../book-card/book-card.component';
import { bookNa } from '../models';
import { bookCollection } from '../store';
import { BookListComponent } from './book-list.component';

describe(BookListComponent.name, () => {
  const createComponent = createComponentFactory({
    component: BookListComponent,
    declarations: [BookCardComponent],
    providers: [
      provideMockStore({
        selectors: [{ selector: bookCollection as any, value: [bookNa(), bookNa()] }]
      })
    ]
  });

  describe('When books are present', () => {
    it('renders books', () => {
      const spectator = createComponent();

      const bookCards = spectator.queryAll(byTestId('book-card'));

      expect(bookCards).toHaveLength(2);
    });
  });
});
