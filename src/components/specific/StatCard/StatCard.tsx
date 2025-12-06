import React from "react";
import styles from "./StatCard.module.css";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color: "blue" | "green" | "red" | "purple";
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => {
  // Map màu sắc
  const bgColors = {
    blue: "#dbeafe",
    green: "#dcfce7",
    red: "#fee2e2",
    purple: "#f3e8ff",
  };
  const textColors = {
    blue: "#3b82f6",
    green: "#22c55e",
    red: "#ef4444",
    purple: "#a855f7",
  };

  return (
    <div className={styles.card}>
      <div>
        <p className={styles.label}>{label}</p>
        <p className={styles.value}>{value}</p>
      </div>
      <div
        className={styles.iconBox}
        style={{ backgroundColor: bgColors[color] }}
      >
        <span
          className="material-symbols-outlined"
          style={{ color: textColors[color] }}
        >
          {icon}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
