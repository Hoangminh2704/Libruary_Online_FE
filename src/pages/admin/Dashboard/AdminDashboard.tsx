import React, { useState, useEffect } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import StatCard from "../../../components/specific/StatCard/StatCard";
import styles from "./AdminDashboard.module.css";
import dashboardService from "../../../services/dashboardService";
import { MOCK_ACTIVITIES } from "../../../data/mockDashboard";
import type { DashboardStats } from "../../../types/dashboard.types";

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalBooks: 0,
    booksOnLoan: 0,
    overdueItems: 0,
    totalMembers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.getDashboardStats();

      console.log("📊 Dashboard stats loaded:", data);
      setStats(data);
    } catch (err) {
      console.error("❌ Error fetching dashboard stats:", err);
      const error = err as {
        message?: string;
        response?: {
          data?: { message?: string };
          status?: number;
        };
      };
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to load dashboard statistics";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "return":
        return { bg: "#dcfce7", text: "#22c55e", icon: "check" };
      case "new_member":
        return { bg: "#dbeafe", text: "#3b82f6", icon: "add" };
      case "overdue":
        return { bg: "#fef3c7", text: "#f59e0b", icon: "priority_high" };
      case "new_book":
        return { bg: "#f3e8ff", text: "#a855f7", icon: "library_add" };
      default:
        return { bg: "#f1f5f9", text: "#64748b", icon: "info" };
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className={styles.loadingContainer}>
          <p>Loading dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>Error: {error}</p>
          <button onClick={fetchDashboardStats} className={styles.retryBtn}>
            Retry
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>Dashboard Overview</h2>
          <p className={styles.subtitle}>
            Welcome back, Sarah. Here's what's happening at your library today.
          </p>
        </div>
        <div className={styles.actions}>
          <div className={styles.notificationWrapper}>
            <button className={styles.notiBtn}>
              <span className={`material-symbols-outlined ${styles.notiIcon}`}>
                notifications
              </span>
            </button>
            <span className={styles.badge}>3</span>
          </div>
          <button className={styles.quickBtn}>
            <span className="material-symbols-outlined">add</span>
            Quick Action
          </button>
        </div>
      </header>
      <div className={styles.statsGrid}>
        <StatCard
          label="Total Books"
          value={stats.totalBooks.toLocaleString()}
          icon="import_contacts"
          color="blue"
        />
        <StatCard
          label="Books on Loan"
          value={stats.booksOnLoan.toLocaleString()}
          icon="local_shipping"
          color="green"
        />
        <StatCard
          label="Overdue Items"
          value={stats.overdueItems.toString()}
          icon="error"
          color="red"
        />
        <StatCard
          label="Total Members"
          value={stats.totalMembers.toLocaleString()}
          icon="groups"
          color="purple"
        />
      </div>
      <div className={styles.mainGrid}>
        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Borrowing Trends</h3>
            <button className={styles.filterBtn}>
              Last 30 days
              <span
                className={`material-symbols-outlined ${styles.expandIcon}`}
              >
                expand_more
              </span>
            </button>
          </div>
          <img
            src="https://placehold.co/800x400/1e293b/3b82f6?text=Chart+Placeholder"
            alt="Borrowing Trends Chart"
            className={styles.chartImage}
          />
        </div>

        <div className={styles.chartCard}>
          <h3 className={`${styles.cardTitle} ${styles.cardTitleSpaced}`}>
            Recent Activity
          </h3>
          <div className={styles.activityList}>
            {MOCK_ACTIVITIES.map((act) => {
              const style = getActivityColor(act.type);
              return (
                <div key={act.id} className={styles.activityItem}>
                  <div
                    className={styles.activityIcon}
                    style={{ backgroundColor: style.bg }}
                  >
                    <span
                      className={`material-symbols-outlined ${styles.activityIconSymbol}`}
                      style={{ color: style.text }}
                    >
                      {style.icon}
                    </span>
                  </div>
                  <div>
                    <p className={styles.actTitle}>{act.title}</p>
                    <p className={styles.actDesc}>{act.description}</p>
                    <p className={styles.actTime}>{act.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
