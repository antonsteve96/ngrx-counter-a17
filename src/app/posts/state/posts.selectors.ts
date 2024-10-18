import {createFeatureSelector, createSelector} from "@ngrx/store";
import {POSTS_STATE, PostsState} from "./posts.state";
import {Post} from "../../models/posts.model";
import {getCurrentRoute} from "../../router/router.selectors";
import {RouterStateUrl} from "../../router/custom-serializer";

const getPostsState = createFeatureSelector<PostsState>(POSTS_STATE)

export const getPosts = createSelector(getPostsState, (state) =>
  state.posts
);

export const getPostById = createSelector(
  getPosts,
  getCurrentRoute,
  (posts, route: RouterStateUrl): Post | undefined => {
    return posts.find((post) => post.id === Number(route.params['id']));
  }
);
