import {createFeatureSelector, createSelector} from "@ngrx/store";
import {initialState, POSTS_STATE, PostsState} from "./posts.state";

const getPostsState = createFeatureSelector<PostsState>(POSTS_STATE)

export const getPosts = createSelector(getPostsState, (state) =>
  state.posts
);

export const getPostById = createSelector(getPostsState, (state: PostsState = initialState, props: any) => state.posts.find((post) => post.id === props.id))
