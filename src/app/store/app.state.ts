import {COUNTER_STATE, CounterState} from "../counter/state/counter.state";
import {POSTS_STATE, PostsState} from "../posts/state/posts.state";
import {counterReducer} from "../counter/state/counter.reducer";
import {postsReducer} from "../posts/state/posts.reducer";
import {ActionReducerMap} from "@ngrx/store";

export const appStateKey = 'app';

export interface AppState{
  [COUNTER_STATE]: CounterState,
  [POSTS_STATE]: PostsState
}

export const appReducer: ActionReducerMap<AppState> =  {
  [COUNTER_STATE]: counterReducer,
  [POSTS_STATE]: postsReducer
};
