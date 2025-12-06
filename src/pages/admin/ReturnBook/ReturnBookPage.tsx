import React from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import styles from "./ReturnBookPage.module.css";

const ReturnBookPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <div>
            <h2 className={styles.pageTitle}>Book Return Processing</h2>
            <p className={styles.pageSubtitle}>
              Scan or enter book ID to process returns
            </p>
          </div>
          <div className={styles.dateTime}>
            <span className={`material-symbols-outlined ${styles.dateIcon}`}>
              schedule
            </span>
            <span>Nov 20, 2025, 11:31 AM</span>
          </div>
        </div>

        <div className={styles.scannerCard}>
          <div className={styles.scannerIcon}>
            <span className={`material-symbols-outlined ${styles.scanIcon}`}>
              barcode_scanner
            </span>
          </div>
          <h3 className={styles.scannerTitle}>Scan Book Barcode</h3>
          <p className={styles.scannerDesc}>
            Use the scanner or manually enter the book ID
          </p>

          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Scan barcode or enter Book ID (e.g., BK001234)"
              className={styles.input}
            />
            <button className={styles.searchBtn}>
              <span
                className={`material-symbols-outlined ${styles.searchIcon}`}
              >
                search
              </span>
            </button>
          </div>

          <div className={styles.toggleOptions}>
            <button className={styles.toggleBtn}>
              <span
                className={`material-symbols-outlined ${styles.toggleIcon}`}
              >
                photo_camera
              </span>
              Use Camera
            </button>
            <div className={styles.divider}></div>
            <button className={styles.toggleBtn}>
              <span
                className={`material-symbols-outlined ${styles.toggleIcon}`}
              >
                keyboard
              </span>
              Manual Entry
            </button>
          </div>
        </div>

        <div className={styles.detailsCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Returned Book Details</h3>
            <span className={styles.badge}>Awaiting Scan</span>
          </div>

          <div className={styles.grid}>
            <div className={styles.bookInfo}>
              <div className={styles.bookPlaceholder}>
                <span
                  className={`material-symbols-outlined ${styles.bookIcon}`}
                >
                  menu_book
                </span>
              </div>
              <div className={styles.infoRows}>
                <div>
                  <p className={styles.infoLabel}>Book Title</p>
                  <p className={styles.infoValue}>-</p>
                </div>
                <div>
                  <p className={styles.infoLabel}>Author</p>
                  <p className={styles.infoValue}>-</p>
                </div>
                <div>
                  <p className={styles.infoLabel}>Book ID</p>
                  <p className={styles.infoValue}>-</p>
                </div>
              </div>
            </div>

            <div className={styles.borrowerBox}>
              <h4 className={styles.borrowerHeader}>Borrower Information</h4>
              <div className={styles.borrowerProfile}>
                <div className={styles.avatar}>
                  {/* Avatar Placeholder */}
                  <img
                    src="https://placehold.co/100x100?text=User"
                    alt="User"
                    className={styles.avatarImage}
                  />
                </div>
                <div className={styles.infoRows}>
                  <p className={styles.infoValue}>-</p>
                  <p className={styles.infoLabel}>-</p>
                </div>
              </div>
              <div className={styles.dateRow}>
                <div>
                  <p className={styles.infoLabel}>Borrowed Date</p>
                  <p className={styles.infoValue}>-</p>
                </div>
                <div>
                  <p className={styles.infoLabel}>Due Date</p>
                  <p className={styles.infoValue}>-</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <button className={styles.btnCancel}>Cancel</button>
            <button className={styles.btnConfirm}>
              <span
                className={`material-symbols-outlined ${styles.confirmIcon}`}
              >
                check
              </span>
              Confirm Return
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReturnBookPage;
