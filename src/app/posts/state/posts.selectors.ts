import {createFeatureSelector, createSelector} from "@ngrx/store";
import {POSTS_STATE, PostsState} from "./posts.state";
import {Post} from "../../models/posts.model";

const getPostsState = createFeatureSelector<PostsState>(POSTS_STATE)

export const getPosts = createSelector(getPostsState, (state) =>
  state.posts
);

export const getPostById = (postId: number) => createSelector(
  getPostsState,
  (state: PostsState): Post | undefined => {
    return state.posts.find(post => post.id === postId);
  }
);
