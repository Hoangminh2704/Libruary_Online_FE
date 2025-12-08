import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import styles from "./MemberLayout.module.css";

interface MemberLayoutProps {
  children: React.ReactNode;
}

const MemberLayout: React.FC<MemberLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      path: "/user/my-loans",
      icon: "auto_stories",
      label: "Current Loans",
    },
    {
      path: "/user/reservations",
      icon: "bookmark",
      label: "Reservations",
    },
    {
      path: "/user/history",
      icon: "history",
      label: "History",
    },
    {
      path: "/user/profile",
      icon: "person",
      label: "Profile",
    },
  ];

  const handleLogout = async () => {
    console.log("👋 Logging out...");
    await logout();
    console.log("✅ Logout successful, redirecting to login...");
    navigate("/login");
  };

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <span className="material-icons">menu_book</span>
            </div>
            <span className={styles.logoText}>LibraryHub</span>
          </div>

          <nav className={styles.nav}>
            {menuItems.map((item) => (
              <button
                key={item.path}
                className={`${styles.navItem} ${
                  location.pathname === item.path ? styles.navItemActive : ""
                }`}
                onClick={() => navigate(item.path)}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className={styles.userProfile}>
            <div className={styles.profileCard}>
              <div className={styles.profileInfo}>
                <img
                  src={`https://ui-avatars.com/api/?name=${
                    user?.name || "User"
                  }&background=2563eb&color=fff`}
                  alt="User Avatar"
                  className={styles.avatar}
                />
                <div>
                  <p className={styles.userName}>{user?.name || "User"}</p>
                  <p className={styles.userRole}>
                    {user?.role === "MEMBER" ? "Library Member" : user?.role || "Member"}
                  </p>
                </div>
              </div>
              <button
                className={styles.expandBtn}
                onClick={handleLogout}
                aria-label="Logout"
                title="Logout"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ color: "#ef4444" }}
                >
                  logout
                </span>
              </button>
            </div>
          </div>
        </aside>

        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default MemberLayout;
