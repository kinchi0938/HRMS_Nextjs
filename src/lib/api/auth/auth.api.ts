import { createApiClient } from "../base";
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
} from "@/lib/api/auth/auth.types";

const api = createApiClient();

export const authApi = {
  signup: (data: SignupRequest) => api.post("/signup", data),
  login: async (credentials: { username: string; password: string }) => {
    const response = await api.post<LoginResponse>("/login", credentials);
    if (response.token) {
      localStorage.setItem("accessToken", response.token);
      // 필요한 경우 사용자 정보도 저장
      localStorage.setItem("user", JSON.stringify(response.user));
    }
    return response;
  },
  logout: async () => {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },
};
