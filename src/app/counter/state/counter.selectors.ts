import {AppState, appStateKey} from "../../store/app.state";
import {CounterState} from "./counter.state";

export const getCounterState = (state: AppState): CounterState => {
  // @ts-ignore
  return state[appStateKey].counter;
}

// Selettore per ottenere il valore del contatore
export const getCounter = (state: AppState): number => getCounterState(state).counter;

// Selettore per ottenere il nome del sito
export const getSiteName = (state: AppState): string => getCounterState(state).siteName;
