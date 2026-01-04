import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface AuthResponse {
  message: string;
  userId?: string;
  storedType?: string;
  storedValue?: string;
}

export interface AuthRequest {
  id: string;
  password: string;
}

export const authApi = {
  signup: async (data: AuthRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/signup", data);
    return response.data;
  },

  login: async (data: AuthRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/login", data);
    return response.data;
  },
};

export default api;
