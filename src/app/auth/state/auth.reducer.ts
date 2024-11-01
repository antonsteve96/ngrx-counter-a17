import { Action, createReducer, on } from "@ngrx/store";
import { AuthState, initialState } from "./auth.state";
import {autoLogin, autoLogout, loginStart, loginSuccess, signupStart, signupSuccess} from "./auth.actions";

// Definisci il reducer principale, gestendo lo stato iniziale come fallback
export function authReducer(state: AuthState = initialState, action: Action): AuthState {
  return _authReducer(state, action);
}

// Definisci il reducer con `createReducer`
const _authReducer = createReducer(
  initialState,
  on(loginStart, (state) => ({ ...state })),
  on(loginSuccess, (state, action) => ({ ...state, token: action.token })),
  on(signupStart, (state) => ({...state})),
  on(signupSuccess, (state) => ({...state})),
  on(autoLogin, (state) => ({...state})),
  on(autoLogout, (state) => ({...state, token: ""}))
);
