import {createFeatureSelector, createSelector} from "@ngrx/store";
import {initialState, SharedState} from "./shared.state";

export const SHARED_STATE = "shared"

const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE)

export const getLoadingSpinner = createSelector(getSharedState,(state: SharedState = initialState) => state.loadingSpinner)

export const getErrorMessage = createSelector(getSharedState, (state: SharedState = initialState) => state.errorMessage)
