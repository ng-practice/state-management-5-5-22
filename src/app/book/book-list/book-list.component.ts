import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../models';
import { bookCollection, booksLoadingActions } from '../store';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html'
})
export class BookListComponent implements OnInit {
  books$!: Observable<readonly Book[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.books$ = this.store.select(bookCollection);
  }

  reload() {
    this.store.dispatch(booksLoadingActions.loadingStarted());
  }
}
