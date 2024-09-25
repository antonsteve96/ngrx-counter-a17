import {createAction, props} from "@ngrx/store";

const SET_LOADING_SPINNER = "[Shared State] Set Loading Spinner";

const SET_ERROR_MESSAGE = "[Shared State] Set Error Message";

export const setLoadingSpinner = createAction(SET_LOADING_SPINNER, props<{ status: boolean }>())

export const setErrorMessage = createAction(SET_ERROR_MESSAGE, props<{ message: string }>())
