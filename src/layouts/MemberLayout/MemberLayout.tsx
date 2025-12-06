import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import styles from "./MemberLayout.module.css";

interface MemberLayoutProps {
  children: React.ReactNode;
}

const MemberLayout: React.FC<MemberLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
        </aside>

        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default MemberLayout;
