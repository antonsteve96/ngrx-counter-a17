import {SharedState} from "./shared/shared.state";
import {POSTS_STATE, PostsState} from "../posts/state/posts.state";
import {COUNTER_STATE, CounterState} from "../counter/state/counter.state";
import {counterReducer} from "../counter/state/counter.reducer";
import {postsReducer} from "../posts/state/posts.reducer";
import {ActionReducerMap} from "@ngrx/store";
import {AUTH_STATE} from "../auth/state/auth.selectors";
import {authReducer} from "../auth/state/auth.reducer";
import {AuthState} from "../auth/state/auth.state";
import {SHARED_STATE} from "./shared/shared.selectors";
import {sharedReducer} from "./shared/shared.reducer";

export interface RootState {
  [AUTH_STATE]: AuthState,
  [SHARED_STATE]: SharedState
}

export const rootReducer = {
  [AUTH_STATE]: authReducer,
  [SHARED_STATE]: sharedReducer

}
