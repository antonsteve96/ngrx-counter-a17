import {createAction, props} from "@ngrx/store";
import {Post} from "../../models/posts.model";


export const ADD_POST_ACTION = "[POST PAGE] add post";
export const EDIT_POST_ACTION = "[POST PAGE] edit post"
export const DELETE_POST_ACTION = "[DELETE POST PAGE] delete post";

export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>());

export const updatePost = createAction(EDIT_POST_ACTION, props<{ post : Post }>())

export const deletePost = createAction(DELETE_POST_ACTION, props<{ id: number }>())
