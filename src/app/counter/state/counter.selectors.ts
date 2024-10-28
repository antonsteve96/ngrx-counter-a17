import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {COUNTER_STATE, CounterState} from './counter.state';

// Definiamo il selettore per l'intero stato del contatore
export const getCounterState = createFeatureSelector<CounterState>(COUNTER_STATE);

// Selettore per ottenere il valore del contatore
export const selectCounter = createSelector(
  getCounterState,
  (state: CounterState) => state.counter
);

// Selettore per ottenere il nome del sito
export const getSiteName = createSelector(
  getCounterState,
  (state: CounterState) => state.siteName
);
