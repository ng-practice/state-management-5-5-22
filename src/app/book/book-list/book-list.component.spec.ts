import { byTestId, createComponentFactory } from '@ngneat/spectator';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BookCardComponent } from '../book-card/book-card.component';
import { bookNa } from '../models';
import { bookCollection } from '../store';
import { BookListComponent } from './book-list.component';

describe(BookListComponent.name, () => {
  const createComponent = createComponentFactory({
    component: BookListComponent,
    declarations: [BookCardComponent],
    providers: [provideMockStore()],
    detectChanges: false
  });

  describe('When books are present', () => {
    it('renders books', () => {
      const spectator = createComponent();

      const store = spectator.inject(MockStore);
      store.overrideSelector(bookCollection as any, [bookNa(), bookNa()]);

      spectator.detectChanges();

      const bookCards = spectator.queryAll(byTestId('book-card'));

      expect(bookCards).toHaveLength(2);
    });
  });
});
