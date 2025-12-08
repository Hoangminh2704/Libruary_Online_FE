import React, { useState } from "react";
import { loanService } from "../../../services/loanService";
import type { BookItem } from "../../../types/catalog.types";
import styles from "./BorrowModal.module.css";

interface BorrowModalProps {
  book: BookItem;
  onClose: () => void;
  onSuccess: () => void;
}

const BorrowModal: React.FC<BorrowModalProps> = ({
  book,
  onClose,
  onSuccess,
}) => {
  const [returnDate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 7);

  const todayStr = today.toISOString().split("T")[0];
  const tomorrowStr = tomorrow.toISOString().split("T")[0];
  const maxDateStr = maxDate.toISOString().split("T")[0];

  const handleConfirm = async () => {
    if (!returnDate) {
      setError("Please select a return date");
      return;
    }

    const selectedDate = new Date(returnDate);
    if (selectedDate < tomorrow || selectedDate > maxDate) {
      setError("Return date must be between tomorrow and 7 days from today");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const availableCopy = book.copies?.find(
        (copy) => copy.status === "AVAILABLE"
      );
      if (!availableCopy) {
        setError("No available copies found");
        return;
      }

      await loanService.createLoan(availableCopy.id, returnDate);
      alert(`Successfully borrowed "${book.title}"!`);
      onSuccess();
    } catch (err: unknown) {
      console.error("❌ Error borrowing book:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to borrow book";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Borrow Book</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className={styles.modalBody}>
          <h3 className={styles.bookTitle}>{book.title}</h3>

          <div className={styles.inputGroup}>
            <label htmlFor="startDate" className={styles.label}>
              Start Date (Today)
            </label>
            <input
              id="startDate"
              type="text"
              value={todayStr}
              readOnly
              className={styles.inputReadonly}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="returnDate" className={styles.label}>
              Return Date *
            </label>
            <input
              id="returnDate"
              type="date"
              value={returnDate}
              min={tomorrowStr}
              max={maxDateStr}
              onChange={(e) => setReturnDate(e.target.value)}
              className={styles.inputField}
            />
            <small className={styles.hint}>
              Must be between {tomorrowStr} and {maxDateStr}
            </small>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}
        </div>

        <div className={styles.modalFooter}>
          <button
            className={styles.btnCancel}
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={styles.btnConfirm}
            onClick={handleConfirm}
            disabled={loading || !returnDate}
          >
            {loading ? "Processing..." : "Confirm Borrow"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BorrowModal;
