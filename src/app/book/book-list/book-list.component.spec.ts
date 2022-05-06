import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BookCardComponent } from '../book-card/book-card.component';
import { bookNa } from '../models';
import { bookCollection } from '../store';
import { BookListComponent } from './book-list.component';

describe(BookListComponent.name, () => {
  let fixture: ComponentFixture<BookListComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookListComponent, BookCardComponent],
      providers: [provideMockStore()]
    });

    store = TestBed.inject(MockStore);
  });

  describe('When books are present', () => {
    it('renders books', () => {
      store.overrideSelector(bookCollection as any, [bookNa(), bookNa()]);

      fixture = TestBed.createComponent(BookListComponent);
      fixture.detectChanges();

      // import { By } from '@angular/platform-browser';
      const bookCards = fixture.debugElement.queryAll(By.css('[data-test=book-card]'));

      expect(bookCards.length).toBe(2);
    });
  });
});
