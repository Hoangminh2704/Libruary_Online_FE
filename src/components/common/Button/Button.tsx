import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  icon?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  type = "button",
  icon,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
    >
      {icon && (
        <span className={styles.iconWrapper}>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "20px" }}
          >
            {icon}
          </span>
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
