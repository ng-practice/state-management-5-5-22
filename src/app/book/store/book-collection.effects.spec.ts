import { RouterTestingModule } from '@angular/router/testing';
import { createServiceFactory } from '@ngneat/spectator';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';
import { BookApiService } from '../book-api.service';
import { bookNa } from '../models';
import { booksLoadingActions } from './book-collection.actions';
import { BookCollectionEffects } from './book-collection.effects';
import { bookCollection } from './book-collection.selectors';
import { bookFeatureName, bookFeatureReducers } from './book.feature';

describe(BookCollectionEffects.name, () => {
  const bookApiMock = mock(BookApiService);

  when(bookApiMock.getAll()).thenReturn(of([bookNa()]));

  const createService = createServiceFactory({
    service: Store,
    imports: [
      StoreModule.forRoot({}, {}),
      StoreModule.forFeature(bookFeatureName, bookFeatureReducers),
      EffectsModule.forRoot([BookCollectionEffects]),
      RouterTestingModule
    ],
    providers: [{ provide: BookApiService, useFactory: () => instance(bookApiMock) }]
  });

  describe('When a book is created successfully', () => {
    it('is accessible in the store', done => {
      const service = createService();

      const store = service.inject(Store);

      store.dispatch(booksLoadingActions.loadingStarted());

      store.select(bookCollection).subscribe((books: any) => {
        expect(books.length).toBe(1);
        done();
      });
    });
  });
});
