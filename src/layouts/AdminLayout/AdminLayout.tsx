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
  const { logout } = useAuth();

  const menuItems = [
    { path: "/admin/dashboard", icon: "dashboard", label: "Dashboard" },
    { path: "/admin/catalog", icon: "collections_bookmark", label: "Catalog" },
    { path: "/admin/members", icon: "groups", label: "Members" },
    { path: "/admin/returns", icon: "autorenew", label: "Book Return" },
    { path: "/admin/settings", icon: "settings", label: "Settings" },
  ];

  const handleLogout = () => {
    logout();
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
                src="https://placehold.co/100x100?text=SJ"
                alt="Admin"
                className={styles.avatar}
              />
              <div>
                <p className={styles.adminName}>Sarah Johnson</p>
                <p className={styles.adminRole}>Library Admin</p>
              </div>
            </div>
            <button
              className={styles.expandBtn}
              aria-label="Expand profile menu"
            >
              <span className="material-symbols-outlined">expand_less</span>
            </button>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      </aside>

      <main className={styles.mainWrapper}>{children}</main>
    </div>
  );
};

export default AdminLayout;
