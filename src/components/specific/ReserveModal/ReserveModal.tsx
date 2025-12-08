import React, { useState } from "react";
import { reservationService } from "../../../services/reservationService";
import type { BookItem } from "../../../types/catalog.types";
import styles from "./ReserveModal.module.css";

interface ReserveModalProps {
  book: BookItem;
  onClose: () => void;
  onSuccess: () => void;
}

const ReserveModal: React.FC<ReserveModalProps> = ({
  book,
  onClose,
  onSuccess,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getEstimatedAvailableDate = (): string => {
    const bookWithMetadata = book as BookItem & {
      estimatedAvailableDate?: string;
    };
    if (bookWithMetadata.estimatedAvailableDate) {
      const date = new Date(bookWithMetadata.estimatedAvailableDate);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    const loanedCopies = book.copies?.filter(
      (copy) => copy.status === "LOANED"
    );

    if (!loanedCopies || loanedCopies.length === 0) {
      return "Unknown";
    }

    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + 14);
    return estimatedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const estimatedDate = getEstimatedAvailableDate();
  const today = new Date().toISOString().split("T")[0];

  const handleConfirm = async () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      setError("End date must be after start date");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await reservationService.createReservation(book.id, startDate, endDate);
      alert(
        `Successfully reserved "${book.title}"! You will be notified when available.`
      );
      onSuccess();
    } catch (err: unknown) {
      console.error("❌ Error reserving book:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to reserve book";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Reserve Book</h2>
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

          <div className={styles.infoBox}>
            <span className="material-symbols-outlined">info</span>
            <div>
              <strong>Estimated Available Date:</strong>
              <p>{estimatedDate}</p>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="startDate" className={styles.label}>
              Desired Start Date *
            </label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              min={today}
              onChange={(e) => setStartDate(e.target.value)}
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="endDate" className={styles.label}>
              Desired End Date *
            </label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              min={startDate || today}
              onChange={(e) => setEndDate(e.target.value)}
              className={styles.inputField}
            />
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
            disabled={loading || !startDate || !endDate}
          >
            {loading ? "Processing..." : "Confirm Reservation"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReserveModal;
