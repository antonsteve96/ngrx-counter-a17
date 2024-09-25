
export const initialState: CounterState = {
  counter: 0,
  siteName: "stefanoantonetti"
}

export const COUNTER_STATE = "counter";

export interface CounterState {
  counter: number;
  siteName: string;
}
