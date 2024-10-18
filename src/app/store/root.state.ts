import {SharedState} from "./shared/shared.state";
import {ActionReducerMap} from "@ngrx/store";
import {AUTH_STATE} from "../auth/state/auth.selectors";
import {authReducer} from "../auth/state/auth.reducer";
import {AuthState} from "../auth/state/auth.state";
import {SHARED_STATE} from "./shared/shared.selectors";
import {sharedReducer} from "./shared/shared.reducer";
import {routerReducer, RouterReducerState} from "@ngrx/router-store";

export interface RootState {
  [AUTH_STATE]: AuthState,
  [SHARED_STATE]: SharedState,
  router: RouterReducerState
}

export const rootReducer: ActionReducerMap<RootState> = {
  [AUTH_STATE]: authReducer,
  [SHARED_STATE]: sharedReducer,
  router: routerReducer
}
