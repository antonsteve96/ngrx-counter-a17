import {createFeatureSelector, createSelector} from "@ngrx/store";
import {COUNTER_STATE, CounterState, initialState} from "./counter.state";


const getCounterState = createFeatureSelector<CounterState>(COUNTER_STATE);

export const getCounter = createSelector(getCounterState, (state: CounterState = initialState) => (state.counter))

export const getSiteName = createSelector(getCounterState, (state: CounterState = initialState) => (state.siteName))
