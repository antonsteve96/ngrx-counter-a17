
export const initialState: CounterState = {
  counter: 0,
  siteName: "stefanoantonetti"
}

export interface CounterState {
  counter: number;
  siteName: string;
}
