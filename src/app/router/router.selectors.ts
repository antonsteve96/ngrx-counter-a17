import {createFeatureSelector, createSelector} from "@ngrx/store";
import {RouterReducerState} from "@ngrx/router-store";
import {RouterStateUrl} from "./custom-serializer";

const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const getCurrentRoute = createSelector(getRouterState, (router): RouterStateUrl => router.state);
