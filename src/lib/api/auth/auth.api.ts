import { createApiClient } from "../base";
import type { LoginRequest, SignupRequest } from "@/lib/api/auth/auth.types";

const api = createApiClient();

export const authApi = {
  signup: (data: SignupRequest) => api.post("/signup", data),
  login: (data: LoginRequest) => api.post("/login", data),
};
