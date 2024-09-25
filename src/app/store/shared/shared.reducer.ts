import { initialState, SharedState } from './shared.state';
import { Action, createReducer, on } from '@ngrx/store';
import { setErrorMessage, setLoadingSpinner } from './shared.actions';

export const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => ({ ...state, loadingSpinner: action.status })),
  on(setErrorMessage, (state, action) => ({ ...state, errorMessage: action.message }))
);

export function sharedReducer(state: SharedState | undefined = initialState, action: Action): SharedState {
  return _sharedReducer(state, action);
}
