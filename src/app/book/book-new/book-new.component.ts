import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { bookCreationActions } from '@store/book';
import { Book, bookNa } from '../models';

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html'
})
export class BookNewComponent {
  form = this.buildForm();

  constructor(private store: Store, private fb: FormBuilder) {}

  create() {
    const book: Book = { ...bookNa(), ...this.form.value };

    this.store.dispatch(bookCreationActions.creationStarted({ book }));
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      isbn: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', Validators.required],
      author: ['', Validators.required],
      cover: ['']
    });
  }
}
