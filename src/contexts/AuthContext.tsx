import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import authService from "../services/authService";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Khôi phục user từ localStorage khi app khởi động
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      console.log("📡 Sending login request to backend...");
      const response = await authService.login(username, password);

      console.log("📥 Login response received:", {
        token: response.token ? "✓ Token received" : "✗ No token",
        user: response.user,
      });

      console.log("🔍 Setting user state:", response.user);
      setUser(response.user);

      console.log("✅ User state updated in AuthContext");
      console.log("👤 Current user:", response.user);

      return true;
    } catch (error: any) {
      console.error("❌ Login failed in AuthContext:", error);
      console.error("📋 Error response:", error.response?.data);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
