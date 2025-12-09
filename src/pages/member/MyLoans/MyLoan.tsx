import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MemberLayout from "../../../layouts/MemberLayout/MemberLayout";
import styles from "./MyLoansPage.module.css";
import { loanService } from "../../../services/loanService";
import type { LoanItem } from "../../../types/loan.types";

const MyLoansPage: React.FC = () => {
  const navigate = useNavigate();
  const [loans, setLoans] = useState<LoanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [renewingId, setRenewingId] = useState<number | null>(null);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await loanService.getMyLoans();
      setLoans(data);
    } catch (err: unknown) {
      console.error("❌ Error fetching loans:", err);
      setError(err instanceof Error ? err.message : "Failed to load loans");
    } finally {
      setLoading(false);
    }
  };

  const handleRenewLoan = async (loanId: number) => {
    try {
      setRenewingId(loanId);
      await loanService.renewLoan(loanId);
      alert("Loan renewed successfully!");
      await fetchLoans();
    } catch (err: unknown) {
      console.error("❌ Error renewing loan:", err);
      alert(err instanceof Error ? err.message : "Failed to renew loan");
    } finally {
      setRenewingId(null);
    }
  };

  const calculateStatus = (
    loan: LoanItem
  ): "Active" | "Overdue" | "Due Soon" | "Returned" => {
    if (loan.status === "RETURNED") return "Returned";
    if (loan.status === "OVERDUE") return "Overdue";

    const today = new Date();
    const dueDate = new Date(loan.dueDate);
    const daysUntilDue = Math.ceil(
      (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilDue <= 3) return "Due Soon";
    return "Active";
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Invalid Date";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const stats = {
    total: loans.filter((l) => l.status !== "RETURNED").length,
    overdue: loans.filter((l) => l.status === "OVERDUE").length,
    dueSoon: loans.filter((l) => {
      const status = calculateStatus(l);
      return status === "Due Soon";
    }).length,
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Overdue":
        return styles.badgeOverdue;
      case "Active":
        return styles.badgeActive;
      case "Due Soon":
        return styles.badgeDueSoon;
      case "Returned":
        return styles.badgeReturned;
      default:
        return styles.badgeActive;
    }
  };

  if (loading) {
    return (
      <MemberLayout>
        <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
          <p>Loading your loans...</p>
        </div>
      </MemberLayout>
    );
  }

  if (error) {
    return (
      <MemberLayout>
        <div style={{ textAlign: "center", padding: "3rem", color: "#ef4444" }}>
          <p>Error: {error}</p>
          <button
            onClick={fetchLoans}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              background: "#e2e8f0",
              border: "none",
              borderRadius: "0.25rem",
            }}
          >
            Retry
          </button>
        </div>
      </MemberLayout>
    );
  }

  const activeLoans = loans.filter((l) => l.status !== "RETURNED");

  return (
    <MemberLayout>
      {stats.overdue > 0 && (
        <div className={styles.alert}>
          <span className="material-symbols-outlined">warning</span>
          <div>
            <strong className={styles.alertTitle}>Overdue Alert</strong>
            <span>
              You have {stats.overdue} overdue book
              {stats.overdue > 1 ? "s" : ""}. Please return them as soon as
              possible.
            </span>
          </div>
          <button className={styles.alertClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      )}

      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.title}>Current Loans</h2>
          <p className={styles.subtitle}>
            Manage your borrowed books and renewal dates
          </p>
        </div>
        <div className={styles.headerActions}>
          <span className={styles.bookCount}>
            {activeLoans.length} books borrowed
          </span>
          <button
            className={styles.browseBtn}
            onClick={() => navigate("/user/books")}
          >
            <span className="material-symbols-outlined">add</span>
            Browse Catalog
          </button>
        </div>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Loan ID</th>
              <th className={styles.th}>Book Title</th>
              <th className={styles.th}>Borrow Date</th>
              <th className={styles.th}>Due Date</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {activeLoans.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.emptyState}>
                  No active loans.{" "}
                  <a href="/user/books" className={styles.emptyStateLink}>
                    Browse catalog
                  </a>{" "}
                  to borrow books.
                </td>
              </tr>
            ) : (
              activeLoans.map((loan) => {
                const status = calculateStatus(loan);
                const bookTitle = loan.copy?.book?.title || "Unknown Book";
                const authorName =
                  loan.copy?.book?.authors?.[0]?.author.name ||
                  "Unknown Author";

                return (
                  <tr key={loan.id}>
                    <td className={styles.td}>
                      <span className={styles.loanId}>#{loan.id}</span>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.bookInfo}>
                        <div className={styles.iconBox}>
                          <span
                            className={`material-symbols-outlined ${styles.iconDescriptionGray}`}
                          >
                            description
                          </span>
                        </div>
                        <div>
                          <div className={styles.bookTitle}>{bookTitle}</div>
                          <div className={styles.bookAuthor}>
                            by {authorName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.td}>{formatDate(loan.loanDate)}</td>
                    <td className={styles.td}>{formatDate(loan.dueDate)}</td>
                    <td className={styles.td}>
                      <span
                        className={`${styles.badge} ${getStatusBadgeClass(
                          status
                        )}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <button
                        className={styles.renewBtn}
                        onClick={() => handleRenewLoan(loan.id)}
                        disabled={
                          renewingId === loan.id || status === "Overdue"
                        }
                      >
                        {renewingId === loan.id ? "Renewing..." : "Renew"}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconBlue}`}>
            <span
              className={`material-symbols-outlined ${styles.statIconSymbol}`}
            >
              menu_book
            </span>
          </div>
          <div>
            <p className={styles.statLabel}>Total Borrowed</p>
            <p className={styles.statValue}>{stats.total}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconRed}`}>
            <span
              className={`material-symbols-outlined ${styles.statIconSymbol}`}
            >
              error
            </span>
          </div>
          <div>
            <p className={styles.statLabel}>Overdue</p>
            <p className={styles.statValue}>{stats.overdue}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconYellow}`}>
            <span
              className={`material-symbols-outlined ${styles.statIconSymbol}`}
            >
              hourglass_top
            </span>
          </div>
          <div>
            <p className={styles.statLabel}>Due This Week</p>
            <p className={styles.statValue}>{stats.dueSoon}</p>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default MyLoansPage;
