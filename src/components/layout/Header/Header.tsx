import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/user/homepage");
  };

  const handleAvatarClick = () => {
    navigate("/user/my-loans");
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div
          className={styles.logo}
          onClick={handleHomeClick}
          style={{ cursor: "pointer" }}
        >
          <span className="material-icons">menu_book</span>
          <span className={styles.logoText}>Library</span>
        </div>

        <nav className={styles.nav}>
          <a href="#" className={styles.navLink} onClick={handleHomeClick}>
            Home
          </a>
          <a href="#" className={styles.navLink}>
            Books
          </a>
          <a href="#" className={styles.navLink}>
            Categories
          </a>
          <a href="#" className={styles.navLink}>
            About
          </a>
        </nav>

        <div className={styles.actions}>
          {isAuthenticated ? (
            <>
              <div
                className={styles.userInfo}
                onClick={handleAvatarClick}
                style={{ cursor: "pointer" }}
              >
                <span className="material-icons" style={{ fontSize: "20px" }}>
                  account_circle
                </span>
                <span className={styles.username}>{user?.username}</span>
              </div>
              <button onClick={handleLogout} className={styles.btnLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className={styles.btnSecondary}>Login</button>
              <button className={styles.btnPrimary}>Sign Up</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
