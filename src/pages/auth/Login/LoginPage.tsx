import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import InputField from "../../../components/common/InputField/InputField";
import AuthLayout from "../../../layouts/AuthLayout";
import styles from "./LoginPage.module.css";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    console.log("🔐 Attempting login with username:", username);

    try {
      const success = await login(username, password);

      if (success) {
        const userStr = localStorage.getItem("user");
        console.log("📦 Raw user data from localStorage:", userStr);

        if (userStr) {
          const user = JSON.parse(userStr);
          console.log("✅ Login successful!");
          console.log("👤 Parsed User:", user);
          console.log("🔑 User Role:", user.role);
          console.log("🔍 Role Type:", typeof user.role);

          const userRole = user.role?.toUpperCase();
          console.log("🎯 Normalized Role:", userRole);

          if (userRole === "ADMIN") {
            console.log("🔀 Redirecting to Admin Dashboard...");
            navigate("/admin/dashboard", { replace: true });
          } else if (userRole === "MEMBER") {
            console.log("🔀 Redirecting to User Homepage...");
            navigate("/user/homepage", { replace: true });
          } else {
            console.warn("⚠️ Unknown role:", user.role);
            navigate("/user/homepage", { replace: true });
          }
        } else {
          console.error("❌ No user data in localStorage");
          setError("Login successful but user data not found");
        }
      } else {
        console.error("❌ Login failed: Invalid credentials");
        setError("Invalid username or password");
      }
    } catch (err: any) {
      console.error("❌ Login error:", err);
      console.error("📋 Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logoBox}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "32px", color: "white" }}
            >
              menu_book
            </span>
          </div>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to your library account</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div
              style={{
                color: "#ef4444",
                marginBottom: "1rem",
                fontSize: "0.875rem",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <InputField
            id="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
            icon="person"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon="lock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className={styles.rowBetween}>
            <div className={styles.checkboxGroup}>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className={styles.checkbox}
              />
              <label htmlFor="remember-me" className={styles.checkboxLabel}>
                Remember me
              </label>
            </div>
            <a href="#" className={styles.forgotLink}>
              Forgot Password?
            </a>
          </div>

          <button type="submit" className={styles.btn} disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className={styles.dividerWrapper}>
          <div className={styles.dividerLine}></div>
          <span className={styles.dividerText}>or</span>
        </div>

        <div className={styles.footerText}>Don't have an account?</div>

        <div className={styles.createBtnWrapper}>
          <button
            type="button"
            className={styles.btnOutline}
            onClick={() => navigate("/register")}
          >
            <span className="material-symbols-outlined">person_add</span>
            Create an Account
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
