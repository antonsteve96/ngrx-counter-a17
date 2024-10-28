import {patchState, signalStore, withMethods, withState} from "@ngrx/signals";

export const initialState: CounterState = {
  counter: 0,
  siteName: "stefanoantonetti"
}


type CounterState = {
  counter: number;
  siteName: string;
}

export const CounterStore = signalStore(
  withState(initialState),

  withMethods((store) => ({
    increment() {
      patchState(store, { counter: store.counter() + 1 });
    },

    decrement() {
      patchState(store, { counter: store.counter() - 1 });
    },

    reset() {
      patchState(store, { counter: 0 });
    },

    changeSiteName() {
      patchState(store, { siteName: "Sito modificato" })
    },

    addCustomInput(inputValue: number) {
      patchState(store, { counter: store.counter() + inputValue })
    },

    getSiteName() {
      return store.siteName();
    },

    getCounter() {
      return store.counter();
    }

    // Puoi aggiungere altri metodi per il contatore qui
  }))
);
