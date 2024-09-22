import {initialState, PostsState} from "./posts.state";
import {Action, createReducer, on} from "@ngrx/store";
import {addPost, deletePost, updatePost} from "./posts.actions";

const _postsReducer = createReducer(
  initialState,
  on(addPost, (state, action) => ({...state, posts: [...state.posts, {...action.post, id: state.posts.length + 1}]})),
  on(updatePost, (state, action) => ({
    ...state,
    posts: state.posts.map(post =>
      post.id === action.post.id ? action.post : post
    )})),
  on(deletePost, (state, action) => ({...state, posts: state.posts.filter((post) => post.id !== action.id)}))
)


export function postsReducer(state: PostsState | undefined, action: Action): PostsState {
  return _postsReducer(state ?? initialState, action); // Se lo stato è undefined, usa initialState
}
