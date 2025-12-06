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
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = login(username, password);
    if (success) {
      const loggedInUser =
        username === "admin" ? { role: "admin" } : { role: "user" };
      if (loggedInUser.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/homepage");
      }
    } else {
      setError("Invalid username or password");
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

          <button type="submit" className={styles.btn}>
            Sign In
          </button>
        </form>

        <div className={styles.dividerWrapper}>
          <div className={styles.dividerLine}></div>
          <span className={styles.dividerText}>or</span>
        </div>

        <div className={styles.footerText}>Don't have an account?</div>

        <div className={styles.createBtnWrapper}>
          <button type="button" className={styles.btnOutline}>
            <span className="material-symbols-outlined">person_add</span>
            Create an Account
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
