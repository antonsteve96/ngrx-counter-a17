import {createAction, props} from "@ngrx/store";
import {Post} from "../../models/posts.model";


const ADD_POST = "[Post Page] Add Post";
const EDIT_POST = "[Post Page] Edit Post"
const DELETE_POST = "[Delete Post Page] Delete Post";
const LOAD_POSTS = "[Post Page] Load Post]";
const LOAD_POSTS_SUCCESS = "[Post Page] Load Posts Success";
const ADD_POSTS_SUCCESS = "[Post Page] Add Post Success";
const UPDATE_POSTS_SUCCESS = "[Post Page] Edit Post Success";
const DELETE_POSTS_SUCCESS = "[Post Page] Delete Post Success";
const RESET_POSTS = "[Post Page] Reset Post"

export const addPost = createAction(ADD_POST, props<{ post: Post }>());

export const updatePost = createAction(EDIT_POST, props<{ post : Post }>())

export const deletePost = createAction(DELETE_POST, props<{ id: number }>())

export const loadPosts = createAction(LOAD_POSTS);

export const loadPostsSuccess = createAction(LOAD_POSTS_SUCCESS, props<{ posts: Post[]}>());

export const addPostsSuccess = createAction(ADD_POSTS_SUCCESS, props<{ post: Post }>());

export const updatePostSuccess = createAction(UPDATE_POSTS_SUCCESS, props<{ post: Post }>());

export const deletePostSuccess = createAction(DELETE_POSTS_SUCCESS);

export const resetPosts = createAction(RESET_POSTS);
