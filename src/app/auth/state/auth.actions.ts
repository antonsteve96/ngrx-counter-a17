import {createAction, props} from "@ngrx/store";
import { RegistrationRequest} from "../../models/registration-request.model";

const LOGIN_START = "[Auth] Login Start";
const LOGIN_SUCCESS = "[Auth] Login Success";
const LOGIN_FAILURE = "[Auth] Login Fail";
const AUTO_LOGIN = "[Auth] Auto Login";

export const loginStart = createAction(LOGIN_START, props<{
  email: string,
  password: string
}>());

export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ token: string }>());

const SIGNUP_START = "[Signup] Signup Start";
const SIGNUP_SUCCESS = "[Signup] Signup Success";

export const signupStart = createAction(SIGNUP_START, props<{ registrationRequest: RegistrationRequest}>());

export const signupSuccess = createAction(SIGNUP_SUCCESS)

export const autoLogin = createAction(AUTO_LOGIN);
