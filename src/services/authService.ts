import axiosClient from "./axiosClient";

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    username: string;
    role: string;
  };
}

interface RegisterRequest {
  name: string;
  email: string;
  username: string;
  password: string;
  phone?: string;
}

const authService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response: LoginResponse = await axiosClient.post("/auth/login", {
      username,
      password,
    });

    if (response.token && response.user) {
      localStorage.setItem("accessToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    } else {
      throw new Error("Invalid response from server");
    }

    return response;
  },

  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    const response: LoginResponse = await axiosClient.post(
      "/auth/register",
      data
    );

    if (response.token) {
      localStorage.setItem("accessToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    }

    return response;
  },

  logout: async (): Promise<void> => {
    try {
      await axiosClient.post("/auth/logout");
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => {
    return localStorage.getItem("accessToken");
  },
};

export default authService;
