import { createReducer, on, Action } from '@ngrx/store';
import {increment, decrement, reset, customIncrement, changeSiteName} from './counter.actions';
import {CounterState, initialState} from "./counter.state";


const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({ ...state, counter: state.counter + 1 })),
  on(decrement, (state) => ({ ...state, counter: state.counter - 1 })),
  on(reset, (state) => ({...state, counter: 0 })),
  on(customIncrement, (state, action) => ({...state, counter: state.counter + action.value })),
  on(changeSiteName, (state) => ({...state, siteName: "Modified Site Name"}))
);

export function counterReducer(state: CounterState | undefined, action: Action): CounterState {
  return _counterReducer(state ?? initialState, action); // Se lo stato è undefined, usa initialState
}
