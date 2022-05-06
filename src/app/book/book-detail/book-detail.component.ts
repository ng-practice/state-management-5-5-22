import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { bookByIsbn, bookDeletionActions } from '../store';

@Component({
  selector: 'ws-book-detail',
  styleUrls: ['./book-detail.component.scss'],
  templateUrl: 'book-detail.component.html'
})
export class BookDetailComponent {
  public book$: Observable<Book | null>;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookApiService
  ) {
    this.book$ = this.route.params.pipe(switchMap(params => this.store.select(bookByIsbn(params.isbn))));
  }

  remove() {
    const isbn = this.route.snapshot.paramMap.get('isbn');
    this.store.dispatch(bookDeletionActions.deletionStarted({ isbn }));
  }
}
