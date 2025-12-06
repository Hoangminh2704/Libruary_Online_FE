import React from "react";
import styles from "./InputField.module.css";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  icon,
  value,
  onChange,
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <div className={styles.iconLeft}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          className={styles.input}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <button type="button" className={styles.toggleBtn}>
            <span className="material-symbols-outlined">visibility</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
