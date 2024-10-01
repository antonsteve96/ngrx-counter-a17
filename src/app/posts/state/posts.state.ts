import {Post} from "../../models/posts.model";

export interface PostsState{
  posts: Post[]
}

export const POSTS_STATE = "posts";

export const initialState: PostsState = {
  posts : []
}
