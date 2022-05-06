import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book } from '../models';

export const bookCreationActions = createActionGroup({
  source: 'Book',
  events: {
    'Creation Started': props<{ book: Book }>(),
    'Creation Succeeded': props<{ book: Book }>()
  }
});

export const bookDeletionActions = createActionGroup({
  source: 'Book',
  events: {
    'Deletion Started': emptyProps(),
    'Deletion Succeeded': props<{ isbn?: string }>()
  }
});

export const bookUpdateActions = createActionGroup({
  source: 'Book',
  events: {
    'Update Started': props<{ book: Book }>(),
    'Update Succeeded': props<{ book: Book }>()
  }
});

export const booksLoadingActions = createActionGroup({
  source: 'Books',
  events: {
    'Loading Started': emptyProps(),
    'Loading Succeeded': props<{ books: Book[] }>()
  }
});
