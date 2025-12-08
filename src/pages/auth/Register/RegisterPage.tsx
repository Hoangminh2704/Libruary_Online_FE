import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/common/InputField/InputField";
import AuthLayout from "../../../layouts/AuthLayout";
import authService from "../../../services/authService";
import styles from "./RegisterPage.module.css";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      setError("");
    };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    console.log("📝 Attempting registration with:", {
      name: formData.name,
      email: formData.email,
      username: formData.username,
      phone: formData.phone,
    });

    try {
      const response = await authService.register({
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        phone: formData.phone,
      });

      console.log("✅ Registration successful:", response);
      alert("Registration successful! Please login with your credentials.");
      navigate("/login");
    } catch (err) {
      console.error("❌ Registration error:", err);
      const error = err as {
        message?: string;
        response?: {
          data?: { message?: string; error?: string };
          status?: number;
        };
      };
      console.error("📋 Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logoBox}>
            <span className="material-symbols-outlined">person_add</span>
          </div>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Join our library community today</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className={styles.errorMessage}>{error}</div>}

          <InputField
            id="name"
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            icon="badge"
            value={formData.name}
            onChange={handleChange("name")}
          />

          <InputField
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            icon="mail"
            value={formData.email}
            onChange={handleChange("email")}
          />

          <InputField
            id="username"
            label="Username"
            type="text"
            placeholder="Choose a username"
            icon="person"
            value={formData.username}
            onChange={handleChange("username")}
          />

          <InputField
            id="phone"
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            icon="phone"
            value={formData.phone}
            onChange={handleChange("phone")}
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Create a password"
            icon="lock"
            value={formData.password}
            onChange={handleChange("password")}
          />

          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            icon="lock"
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
          />

          <div className={styles.termsWrapper}>
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className={styles.checkbox}
              required
            />
            <label htmlFor="terms" className={styles.termsLabel}>
              I agree to the{" "}
              <a href="#" className={styles.link}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className={styles.link}>
                Privacy Policy
              </a>
            </label>
          </div>

          <button type="submit" className={styles.btn} disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className={styles.dividerWrapper}>
          <div className={styles.dividerLine}></div>
          <span className={styles.dividerText}>or</span>
        </div>

        <div className={styles.footerText}>Already have an account?</div>

        <div className={styles.loginBtnWrapper}>
          <button
            type="button"
            className={styles.btnOutline}
            onClick={() => navigate("/login")}
          >
            <span className="material-symbols-outlined">login</span>
            Sign In
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
