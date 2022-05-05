import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../models';
import { bookCollection } from '../store';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html'
})
export class BookListComponent {
  books$: Observable<readonly Book[]>;

  constructor(private store: Store) {
    this.books$ = this.store.select(bookCollection);
  }
}
