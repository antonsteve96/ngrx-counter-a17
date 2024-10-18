import {initialState, PostsState} from "./posts.state";
import {Action, createReducer, on} from "@ngrx/store";
import {
  addPostsSuccess,
  deletePost,
  loadPost,
  loadPosts,
  loadPostsSuccess,
  resetPosts,
  updatePostSuccess
} from "./posts.actions";

const _postsReducer = createReducer(
  initialState,
  on(updatePostSuccess, (state, action) => ({
    ...state,
    posts: state.posts.map(post =>
      post.id === action.post.id ? action.post : post
    )})),
  on(deletePost, (state, action) => ({...state, posts: state.posts.filter((post) => post.id !== action.id)})),
  on(loadPostsSuccess, (state, action) => ({...state, posts: action.posts})),
  on(addPostsSuccess, (state, action) => ({...state, posts: [...state.posts, action.post]})),
  on(resetPosts, () => initialState),
  on(loadPost, (state, action) => ({...state, currentPost: state.posts.filter((post) => action.id === post.id )[0]}))
)


export function postsReducer(state: PostsState | undefined, action: Action): PostsState {
  return _postsReducer(state ?? initialState, action); // Se lo stato è undefined, usa initialState
}
