import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CounterState} from "./counter.state";


const getCounterState = createFeatureSelector<CounterState>('counter');

export const getCounter = createSelector(getCounterState, (state) => (state.counter))

export const getSiteName = createSelector(getCounterState, (state) => (state.siteName))
