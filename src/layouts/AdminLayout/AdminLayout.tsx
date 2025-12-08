import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./AdminLayout.module.css";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: "/admin/dashboard", icon: "dashboard", label: "Dashboard" },
    { path: "/admin/catalog", icon: "collections_bookmark", label: "Catalog" },
    { path: "/admin/members", icon: "groups", label: "Members" },
    { path: "/admin/returns", icon: "autorenew", label: "Book Return" },
    { path: "/admin/settings", icon: "settings", label: "Settings" },
  ];

  const handleLogout = async () => {
    console.log("👋 Logging out...");
    await logout();
    console.log("✅ Logout successful, redirecting to login...");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.logoIcon}>
            <span className="material-symbols-outlined">import_contacts</span>
          </div>
          <div className={styles.brandInfo}>
            <h1>LibraryOS</h1>
            <p>Admin Portal</p>
          </div>
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <a
              key={item.path}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate(item.path);
              }}
              className={`${styles.navLink} ${
                location.pathname === item.path ? styles.activeLink : ""
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.userProfile}>
          <div className={styles.profileCard}>
            <div className={styles.profileInfo}>
              <img
                src={`https://ui-avatars.com/api/?name=${
                  user?.name || "Admin"
                }&background=4361ee&color=fff`}
                alt="Admin Avatar"
                className={styles.avatar}
              />
              <div>
                <p className={styles.adminName}>{user?.name || "Admin User"}</p>
                <p className={styles.adminRole}>
                  {user?.role === "ADMIN"
                    ? "Library Admin"
                    : user?.role || "User"}
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

      <main className={styles.mainWrapper}>{children}</main>
    </div>
  );
};

export default AdminLayout;
