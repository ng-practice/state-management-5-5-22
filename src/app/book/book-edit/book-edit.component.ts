import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Book, bookNa } from '../models';
import { bookByIsbn, bookUpdateActions } from '../store';

@UntilDestroy()
@Component({
  selector: 'ws-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  book: Book | null = bookNa();

  constructor(private store: Store) {}

  ngOnInit() {
    this.selectBookByIsbn();
  }

  save() {
    if (!this.book) return;

    this.store.dispatch(bookUpdateActions.updateStarted({ book: this.book }));
  }

  private selectBookByIsbn() {
    this.store
      .select(bookByIsbn)
      .pipe(
        tap(book => (this.book = book || bookNa())),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
