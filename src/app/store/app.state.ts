import {CounterState} from "../counter/state/counter.state";
import {PostsState} from "../posts/state/posts.state";
import {counterReducer} from "../counter/state/counter.reducer";
import {postsReducer} from "../posts/state/posts.reducer";
import {AuthState} from "../auth/state/auth.state";
import {authReducer} from "../auth/state/auth.reducer";

export interface AppState{
  counter: CounterState,
  posts: PostsState,
  auth: AuthState
}

export const appReducer = {
  counter: counterReducer,
  posts: postsReducer,
  auth: authReducer
}
