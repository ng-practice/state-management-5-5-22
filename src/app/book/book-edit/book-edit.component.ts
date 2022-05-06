import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book, bookNa } from '../models';
import { bookByIsbn, bookUpdateActions } from '../store';

@Component({
  selector: 'ws-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit, OnDestroy {
  sink = new Subscription();
  book: Book | null = bookNa();

  constructor(private store: Store, private route: ActivatedRoute, private bookService: BookApiService) {}

  ngOnInit() {
    this.sink.add(
      this.route.params
        .pipe(
          switchMap(params => this.store.select(bookByIsbn(params.isbn))),
          tap(book => (this.book = book || bookNa()))
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    this.sink.unsubscribe();
  }

  save() {
    if (!this.book) return;
    this.store.dispatch(bookUpdateActions.updateStarted({ book: this.book }));
  }
}
