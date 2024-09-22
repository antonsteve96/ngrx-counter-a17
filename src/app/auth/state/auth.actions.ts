import {createAction, props} from "@ngrx/store";

const LOGIN_START = "[Auth] Login start";
const LOGIN_SUCCESS = "[Auth] Login success";
const LOGIN_FAILURE = "[Auth] Login fail"

export const loginStart = createAction(LOGIN_START, props<{
  email: string,
  password: string
}>());

export const loginSuccess = createAction(LOGIN_SUCCESS);

export const loginFailure = createAction(LOGIN_FAILURE);
