import { createAction, props } from '@ngrx/store';
import { Book } from '../models';

export const createBookStart = createAction('[Book] Create Book Started', props<{ book: Book }>());

export const loadBooksStart = createAction('[Book] Loading Books Started');
export const loadBooksComplete = createAction('[Book] Loading Books Completed', props<{ books: Book[] }>());

// export const bookActions = createActionGroup({
//   source: '[Book]',
//   events: {
//     'Create Book': props<{ book: Book }>(),
//     'Load Book': props<{ book: Book }>(),
//     'Update Book': props<{ book: Book }>()
//   }
// });
