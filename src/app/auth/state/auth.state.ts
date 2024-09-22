export interface AuthState {
  token: string,
  error: string
}

export const initialState: AuthState = {
  token: "",
  error: ""
}
