import {createAction, props} from "@ngrx/store";

const LOGIN_START = "[Auth] Login Start";
const LOGIN_SUCCESS = "[Auth] Login Success";
const LOGIN_FAILURE = "[Auth] Login Fail"

export const loginStart = createAction(LOGIN_START, props<{
  email: string,
  password: string
}>());

export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ token: string }>());

export const loginFailure = createAction(LOGIN_FAILURE, props<{ error: string }>());
