import {createFeatureSelector, createSelector, props} from "@ngrx/store";
import {PostsState} from "./posts.state";
import {state} from "@angular/animations";

const getPostsState = createFeatureSelector<PostsState>("posts")

export const getPosts = createSelector(getPostsState, (state) =>
  state.posts
);

export const getPostById = createSelector(getPostsState, (state: PostsState, props: any) => state.posts.find((post) => post.id === props.id))
