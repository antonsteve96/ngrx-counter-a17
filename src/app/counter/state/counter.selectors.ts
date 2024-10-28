import { createFeatureSelector, createSelector } from '@ngrx/store';
import {  } from './counter.reducer';
import {COUNTER_STATE, CounterState} from "./counter.state"; // Assicurati che CounterState sia importato


// Selettore del feature state di `counter`
export const getCounterState = createFeatureSelector<CounterState>(COUNTER_STATE);

// Selettore per ottenere il valore del contatore
export const getCounter = createSelector(
  getCounterState,
  (state: CounterState) => state.counter
);

// Selettore per ottenere il nome del sito
export const getSiteName = createSelector(
  getCounterState,
  (state: CounterState) => state.siteName
);
