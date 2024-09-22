import {Action, createReducer, } from "@ngrx/store";
import {AuthState, initialState} from "./auth.state";

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}

export const _authReducer = createReducer(
  initialState,

)

