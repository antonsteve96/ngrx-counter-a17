export interface SharedState{
  loadingSpinner: boolean,
  errorMessage: string
}

export const initialState: SharedState = {
  loadingSpinner: false,
  errorMessage: ""
}
