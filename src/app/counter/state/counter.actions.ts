import {createAction, props} from "@ngrx/store";

export const increment = createAction("increment");
export const decrement = createAction("decrement");
export const reset = createAction("reset");
export const customIncrement = createAction("custom increment", props<{ value: number }>())
export const changeSiteName = createAction("change site name");
