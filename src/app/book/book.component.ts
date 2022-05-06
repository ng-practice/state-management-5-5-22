import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { booksLoadingActions } from './store';

@Component({
  selector: 'ws-book',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(booksLoadingActions.loadingStarted());
  }
}
