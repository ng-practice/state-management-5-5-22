import { EntityState } from '@ngrx/entity';
import { Book } from '../models';

export interface BookCollectionSlice extends EntityState<Book> {}
