import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type User = {
  username: string;
};

type AuthState = {
  token: string | null;
  user: User | null;
  isAuthReady: boolean;
};

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: null,
  
  // Savoir si la vérification de connexion est terminée
  // true = il a vérifié que l'user et connecté
  isAuthReady: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
      setCredentials: (state, action: PayloadAction<{ token: string; user: User }>) => {
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.isAuthReady = true;
      },
      setAuthReady: (state) => {
        state.isAuthReady = true;
      },
      logout: (state) => {
          state.token = null;
          state.user = null;
          state.isAuthReady = true;
          localStorage.removeItem('token');
      },
    }
})

export const { setCredentials, setAuthReady, logout } = authSlice.actions

export default authSlice.reducer