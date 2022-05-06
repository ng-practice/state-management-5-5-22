import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';
import { routerFeatureName } from './router.feature';

const routerFeature = createFeatureSelector<RouterReducerState>(routerFeatureName);

export const {
  selectCurrentRoute,
  selectFragment,
  selectQueryParam,
  selectQueryParams,
  selectRouteData,
  selectRouteParam,
  selectRouteParams,
  selectUrl
} = getSelectors(routerFeature);
