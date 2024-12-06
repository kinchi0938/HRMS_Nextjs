import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from "../../utils/localStorage";

export interface User {
  id: string;
  username: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: getLocalStorage("accessToken"),
  isAuthenticated: !!getLocalStorage("accessToken"), // 토큰 존재 여부로 초기값 설정
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      setLocalStorage("accessToken", token);
      setLocalStorage("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      removeLocalStorage("accessToken");
      removeLocalStorage("user");
    },
    checkAuth: (state) => {
      const token = getLocalStorage("accessToken");
      const user = JSON.parse(getLocalStorage("user") || "null");
      state.isAuthenticated = !!token;
      state.user = user;
      state.token = token;
    },
  },
});

export const { setCredentials, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
