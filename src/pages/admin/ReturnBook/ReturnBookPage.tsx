import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import styles from "./ReturnBookPage.module.css";
import { loanService } from "../../../services/loanService";
import type { LoanItem } from "../../../types/loan.types";
import { useAuth } from "../../../contexts/AuthContext";

type ScanStatus = "idle" | "found" | "error";

const ReturnBookPage: React.FC = () => {
  const { user } = useAuth();
  const [inputId, setInputId] = useState<string>("");
  const [loanDetails, setLoanDetails] = useState<LoanItem | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [scanStatus, setScanStatus] = useState<ScanStatus>("idle");

  const handleSearch = async () => {
    if (!inputId.trim()) {
      alert("Please enter a Loan ID");
      return;
    }

    const loanId = parseInt(inputId);
    if (isNaN(loanId)) {
      alert("Invalid Loan ID. Please enter a valid number.");
      return;
    }

    setLoading(true);
    setScanStatus("idle");

    try {
      const loan = await loanService.getLoanById(loanId);
      setLoanDetails(loan);
      setScanStatus("found");
    } catch {
      alert("Loan not found or an error occurred. Please check the Loan ID.");
      setScanStatus("error");
      setLoanDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleConfirmReturn = async () => {
    if (!loanDetails) {
      alert("No loan details found. Please search for a loan first.");
      return;
    }

    if (!user) {
      alert("Admin user not found. Please login again.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to confirm the return of "${
        loanDetails.copy?.book?.title || "this book"
      }"?`
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    try {
      console.log("🔄 Attempting to return loan:", {
        loanId: loanDetails.id,
        adminId: user.id,
      });
      await loanService.returnLoan(loanDetails.id, user.id);
      alert("Book returned successfully!");
      handleCancel();
    } catch (error) {
      console.error("❌ Failed to return book:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      alert(`Failed to return the book: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setInputId("");
    setLoanDetails(null);
    setScanStatus("idle");
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getAuthors = () => {
    const authors = loanDetails?.copy?.book?.authors;
    if (!authors || authors.length === 0) return "-";
    return authors.map((a) => a.author.name).join(", ");
  };

  const getStatusBadge = () => {
    if (scanStatus === "found" && loanDetails) {
      return "Found";
    }
    if (scanStatus === "error") {
      return "Not Found";
    }
    return "Awaiting Scan";
  };

  const getBadgeClass = () => {
    if (scanStatus === "found") {
      return `${styles.badge} ${styles.badgeSuccess}`;
    }
    if (scanStatus === "error") {
      return `${styles.badge} ${styles.badgeError}`;
    }
    return styles.badge;
  };

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
              placeholder="Enter Loan ID (e.g., 123)"
              className={styles.input}
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <button
              className={styles.searchBtn}
              onClick={handleSearch}
              disabled={loading}
            >
              <span
                className={`material-symbols-outlined ${styles.searchIcon}`}
              >
                {loading ? "progress_activity" : "search"}
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
            <span className={getBadgeClass()}>{getStatusBadge()}</span>
          </div>

          <div className={styles.grid}>
            <div className={styles.bookInfo}>
              <div className={styles.bookPlaceholder}>
                {loanDetails?.copy?.book?.coverUrl ? (
                  <img
                    src={loanDetails.copy.book.coverUrl}
                    alt={loanDetails.copy.book.title}
                    className={styles.bookCoverImage}
                  />
                ) : (
                  <span
                    className={`material-symbols-outlined ${styles.bookIcon}`}
                  >
                    menu_book
                  </span>
                )}
              </div>
              <div className={styles.infoRows}>
                <div>
                  <p className={styles.infoLabel}>Book Title</p>
                  <p className={styles.infoValue}>
                    {loanDetails?.copy?.book?.title || "-"}
                  </p>
                </div>
                <div>
                  <p className={styles.infoLabel}>Author</p>
                  <p className={styles.infoValue}>{getAuthors()}</p>
                </div>
                <div>
                  <p className={styles.infoLabel}>Loan ID</p>
                  <p className={styles.infoValue}>{loanDetails?.id || "-"}</p>
                </div>
              </div>
            </div>

            <div className={styles.borrowerBox}>
              <h4 className={styles.borrowerHeader}>Borrower Information</h4>
              <div className={styles.borrowerProfile}>
                <div className={styles.avatar}>
                  <img
                    src="https://placehold.co/100x100?text=User"
                    alt="User"
                    className={styles.avatarImage}
                  />
                </div>
                <div className={styles.infoRows}>
                  <p className={styles.infoValue}>
                    {loanDetails?.member?.user?.name || "-"}
                  </p>
                  <p className={styles.infoLabel}>
                    {loanDetails?.member?.user?.email || "-"}
                  </p>
                </div>
              </div>
              <div className={styles.dateRow}>
                <div>
                  <p className={styles.infoLabel}>Borrowed Date</p>
                  <p className={styles.infoValue}>
                    {formatDate(loanDetails?.loanDate)}
                  </p>
                </div>
                <div>
                  <p className={styles.infoLabel}>Due Date</p>
                  <p className={styles.infoValue}>
                    {formatDate(loanDetails?.dueDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <button
              className={styles.btnCancel}
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className={styles.btnConfirm}
              onClick={handleConfirmReturn}
              disabled={loading || !loanDetails}
            >
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
