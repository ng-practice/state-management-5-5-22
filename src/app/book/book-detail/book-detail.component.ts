import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../models';
import { bookByIsbn, bookDeletionActions } from '../store';

@Component({
  selector: 'ws-book-detail',
  styleUrls: ['./book-detail.component.scss'],
  templateUrl: 'book-detail.component.html'
})
export class BookDetailComponent {
  public book$: Observable<Book | null>;

  constructor(private store: Store) {
    this.book$ = this.store.select(bookByIsbn);
  }

  remove() {
    this.store.dispatch(bookDeletionActions.deletionStarted());
  }
}
