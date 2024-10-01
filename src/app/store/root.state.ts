import {SharedState} from "./shared/shared.state";
import {ActionReducerMap} from "@ngrx/store";
import {AUTH_STATE} from "../auth/state/auth.selectors";
import {authReducer} from "../auth/state/auth.reducer";
import {AuthState} from "../auth/state/auth.state";
import {SHARED_STATE} from "./shared/shared.selectors";
import {sharedReducer} from "./shared/shared.reducer";

export interface RootState {
  [AUTH_STATE]: AuthState,
  [SHARED_STATE]: SharedState,
}

export const rootReducer: ActionReducerMap<RootState> = {
  [AUTH_STATE]: authReducer,
  [SHARED_STATE]: sharedReducer
}
