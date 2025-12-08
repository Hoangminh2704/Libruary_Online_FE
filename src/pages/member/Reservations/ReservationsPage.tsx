import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MemberLayout from "../../../layouts/MemberLayout/MemberLayout";
import styles from "./ReservationsPage.module.css";
import { reservationService } from "../../../services/reservationService";
import type { ReservationItem } from "../../../types/reservation.types";

const ReservationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelingId, setCancelingId] = useState<number | null>(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await reservationService.getMyReservations();
      console.log("📚 Reservations data:", data);
      setReservations(data);
    } catch (err: unknown) {
      console.error("❌ Error fetching reservations:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load reservations"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = async (reservationId: number) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) {
      return;
    }

    try {
      setCancelingId(reservationId);
      await reservationService.cancelReservation(reservationId);
      alert("Reservation cancelled successfully!");
      await fetchReservations();
    } catch (err: unknown) {
      console.error("❌ Error canceling reservation:", err);
      alert(
        err instanceof Error ? err.message : "Failed to cancel reservation"
      );
    } finally {
      setCancelingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "PENDING":
        return styles.badgePending;
      case "FULFILLED":
        return styles.badgeFulfilled;
      case "CANCELLED":
        return styles.badgeCancelled;
      case "EXPIRED":
        return styles.badgeExpired;
      default:
        return styles.badgePending;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pending";
      case "FULFILLED":
        return "Fulfilled";
      case "CANCELLED":
        return "Cancelled";
      case "EXPIRED":
        return "Expired";
      default:
        return status;
    }
  };

  const stats = {
    total: reservations.length,
    pending: reservations.filter((r) => r.status === "PENDING").length,
    fulfilled: reservations.filter((r) => r.status === "FULFILLED").length,
    cancelled: reservations.filter((r) => r.status === "CANCELLED").length,
  };

  if (loading) {
    return (
      <MemberLayout>
        <div className={styles.loadingState}>
          <p>Loading your reservations...</p>
        </div>
      </MemberLayout>
    );
  }

  if (error) {
    return (
      <MemberLayout>
        <div className={styles.errorState}>
          <p>Error: {error}</p>
          <button onClick={fetchReservations} className={styles.retryBtn}>
            Retry
          </button>
        </div>
      </MemberLayout>
    );
  }

  return (
    <MemberLayout>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.title}>My Reservations</h2>
          <p className={styles.subtitle}>
            View and manage your book reservations
          </p>
        </div>
        <div className={styles.headerActions}>
          <span className={styles.reservationCount}>
            {stats.pending} pending reservation{stats.pending !== 1 ? "s" : ""}
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
              <th className={styles.th}>Book Title</th>
              <th className={styles.th}>Reserved Date</th>
              <th className={styles.th}>Expires On</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.emptyState}>
                  No reservations found.{" "}
                  <a href="/user/books" className={styles.emptyStateLink}>
                    Browse catalog
                  </a>{" "}
                  to reserve books.
                </td>
              </tr>
            ) : (
              reservations.map((reservation) => {
                const bookTitle = reservation.book?.title || "Unknown Book";
                const authorName =
                  reservation.book?.authors?.[0]?.author.name ||
                  "Unknown Author";

                return (
                  <tr key={reservation.id}>
                    <td className={styles.td}>
                      <div className={styles.bookInfo}>
                        <div className={styles.iconBox}>
                          <span className="material-symbols-outlined">
                            bookmark
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
                    <td className={styles.td}>
                      {formatDate(reservation.reservedAt)}
                    </td>
                    <td className={styles.td}>
                      {formatDate(reservation.expiresAt)}
                    </td>
                    <td className={styles.td}>
                      <span
                        className={`${styles.badge} ${getStatusBadgeClass(
                          reservation.status
                        )}`}
                      >
                        {getStatusText(reservation.status)}
                      </span>
                    </td>
                    <td className={styles.td}>
                      {reservation.status === "PENDING" ? (
                        <button
                          className={styles.cancelBtn}
                          onClick={() =>
                            handleCancelReservation(reservation.id)
                          }
                          disabled={cancelingId === reservation.id}
                        >
                          {cancelingId === reservation.id
                            ? "Cancelling..."
                            : "Cancel"}
                        </button>
                      ) : (
                        <span className={styles.noAction}>—</span>
                      )}
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
            <span className="material-symbols-outlined">bookmark</span>
          </div>
          <div>
            <p className={styles.statLabel}>Total Reservations</p>
            <p className={styles.statValue}>{stats.total}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconYellow}`}>
            <span className="material-symbols-outlined">schedule</span>
          </div>
          <div>
            <p className={styles.statLabel}>Pending</p>
            <p className={styles.statValue}>{stats.pending}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconGreen}`}>
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <div>
            <p className={styles.statLabel}>Fulfilled</p>
            <p className={styles.statValue}>{stats.fulfilled}</p>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ReservationsPage;
