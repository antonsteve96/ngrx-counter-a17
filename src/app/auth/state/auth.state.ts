export interface AuthState {
  token: string | null,
}

export const initialState: AuthState = {
  token: "",
}
