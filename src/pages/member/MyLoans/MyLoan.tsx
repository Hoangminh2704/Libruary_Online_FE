import React from "react";
import MemberLayout from "../../../layouts/MemberLayout/MemberLayout";
import styles from "./MyLoansPage.module.css";
import { MOCK_LOANS } from "../../../data/mockLoan";

const MyLoansPage: React.FC = () => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Overdue":
        return styles.badgeOverdue;
      case "Active":
        return styles.badgeActive;
      case "Due Soon":
        return styles.badgeDueSoon;
      default:
        return styles.badgeActive;
    }
  };

  return (
    <MemberLayout>
      <div className={styles.alert}>
        <span className="material-symbols-outlined">warning</span>
        <div>
          <strong className={styles.alertTitle}>Overdue Alert</strong>
          <span>
            You have 2 overdue books. Please return them as soon as possible.
          </span>
        </div>
        <button className={styles.alertClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.title}>Current Loans</h2>
          <p className={styles.subtitle}>
            Manage your borrowed books and renewal dates
          </p>
        </div>
        <div className={styles.headerActions}>
          <span className={styles.bookCount}>5 books borrowed</span>
          <button className={styles.browseBtn}>
            <span className="material-symbols-outlined">add</span>
            Browse Catalog
          </button>
        </div>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Book Title</th>
              <th className={styles.th}>Borrow Date</th>
              <th className={styles.th}>Due Date</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_LOANS.map((loan) => (
              <tr key={loan.id}>
                <td className={styles.td}>
                  <div className={styles.bookInfo}>
                    <div className={styles.iconBox}>
                      <span
                        className="material-symbols-outlined"
                        style={{ color: "#64748b" }}
                      >
                        description
                      </span>
                    </div>
                    <div>
                      <div className={styles.bookTitle}>{loan.bookTitle}</div>
                      <div className={styles.bookAuthor}>by {loan.author}</div>
                    </div>
                  </div>
                </td>
                <td className={styles.td}>{loan.borrowDate}</td>
                <td className={styles.td}>{loan.dueDate}</td>
                <td className={styles.td}>
                  <span
                    className={`${styles.badge} ${getStatusBadgeClass(
                      loan.status
                    )}`}
                  >
                    {loan.status}
                  </span>
                </td>
                <td className={styles.td}>
                  <button className={styles.renewBtn}>Renew</button>
                </td>
              </tr>
            ))}
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
            <p className={styles.statValue}>5</p>
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
            <p className={styles.statValue}>2</p>
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
            <p className={styles.statValue}>1</p>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default MyLoansPage;
