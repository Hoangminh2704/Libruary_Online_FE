import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import BorrowModal from "../../../components/specific/BorrowModal/BorrowModal";
import ReserveModal from "../../../components/specific/ReserveModal/ReserveModal";
import styles from "./BookDetailPage.module.css";
import { bookService } from "../../../services/bookService";
import type { BookItem } from "../../../types/catalog.types";

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<BookItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await bookService.getBookById(Number(id));
        setBook(data);
      } catch (err) {
        console.error("Failed to load book:", err);
        setError("Book not found or server error.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleBorrowBook = () => {
    if (!book || !id) return;

    const availableCopy = book.copies?.find(
      (copy) => copy.status === "AVAILABLE"
    );
    if (!availableCopy) {
      alert("No available copies at the moment. Please try reserving instead.");
      return;
    }

    setIsBorrowModalOpen(true);
  };

  const handleReserveBook = () => {
    if (!book || !id) return;
    setIsReserveModalOpen(true);
  };

  const handleBorrowSuccess = async () => {
    setIsBorrowModalOpen(false);
    if (id) {
      try {
        const updatedBook = await bookService.getBookById(Number(id));
        setBook(updatedBook);
      } catch (err) {
        console.error("Failed to refresh book data:", err);
      }
    }
  };

  const handleReserveSuccess = () => {
    setIsReserveModalOpen(false);
  };

  if (loading)
    return (
      <MainLayout>
        <div className={styles.loadingContainer}>Loading...</div>
      </MainLayout>
    );

  if (error || !book)
    return (
      <MainLayout>
        <div className={styles.errorContainer}>{error}</div>
      </MainLayout>
    );

  const available = book.availableCount ?? book.availableCopies ?? 0;
  const total = book.copiesCount ?? book.totalCopies ?? 0;
  const isAvailable = available > 0;

  const authorNames =
    book.authorNames ||
    (book.authors || []).map((a) => a.author.name).join(", ") ||
    "Unknown Author";

  const genreNames =
    book.genreNames ||
    (book.genres || []).map((g) => g.genre.name).join(", ") ||
    "Uncategorized";

  return (
    <MainLayout>
      <div className={styles.pageContainer}>
        <nav className={styles.breadcrumb}>
          <span
            onClick={() => navigate("/user/books")}
            className={styles.breadcrumbLink}
            style={{ cursor: "pointer" }}
          >
            Catalog
          </span>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "16px", margin: "0 8px" }}
          >
            chevron_right
          </span>
          <span className={styles.breadcrumbActive}>{book.title}</span>
        </nav>

        <div className={styles.mainCard}>
          <div className={styles.coverColumn}>
            <div className={styles.coverWrapper}>
              <img
                src={
                  book.coverUrl || "https://placehold.co/400x600?text=No+Cover"
                }
                alt={book.title}
                className={styles.coverImage}
              />
            </div>
          </div>

          <div className={styles.infoColumn}>
            <div className={styles.headerRow}>
              <div>
                <h1 className={styles.bookTitle}>{book.title}</h1>
                <p className={styles.bookAuthor}>by {authorNames}</p>
              </div>
            </div>

            <div className={styles.metaRow}>
              <span className={styles.ratingText}>
                {available} / {total} copies available
              </span>
              <span
                className={styles.statusBadge}
                style={{
                  backgroundColor: isAvailable ? "#dcfce7" : "#fee2e2",
                  color: isAvailable ? "#166534" : "#991b1b",
                }}
              >
                {isAvailable ? "Available" : "Out of Stock"}
              </span>
            </div>

            <div className={styles.descriptionSection}>
              <h2 className={styles.sectionHeading}>Description</h2>
              <p className={styles.descriptionText}>
                {book.description || "No description available for this book."}
              </p>
            </div>

            <div className={styles.infoGrid}>
              <div>
                <div className={styles.infoLabel}>ISBN:</div>
                <div className={styles.infoValue}>{book.isbn || "N/A"}</div>
              </div>
              <div>
                <div className={styles.infoLabel}>Publisher:</div>
                <div className={styles.infoValue}>
                  {book.publisher || "N/A"}
                </div>
              </div>
              <div>
                <div className={styles.infoLabel}>Year:</div>
                <div className={styles.infoValue}>
                  {book.publicationYear || "N/A"}
                </div>
              </div>
              <div>
                <div className={styles.infoLabel}>Language:</div>
                <div className={styles.infoValue}>
                  {book.language || "English"}
                </div>
              </div>
              <div>
                <div className={styles.infoLabel}>Categories:</div>
                <div className={styles.infoValue}>{genreNames}</div>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button
                className={styles.btnPrimary}
                disabled={!isAvailable}
                onClick={handleBorrowBook}
              >
                <span className="material-symbols-outlined">book</span>
                {isAvailable ? "Borrow Now" : "Unavailable"}
              </button>

              {!isAvailable && (
                <button
                  className={styles.btnSecondary}
                  onClick={handleReserveBook}
                >
                  <span className="material-symbols-outlined">
                    bookmark_add
                  </span>
                  Reserve Book
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {isBorrowModalOpen && book && (
        <BorrowModal
          book={book}
          onClose={() => setIsBorrowModalOpen(false)}
          onSuccess={handleBorrowSuccess}
        />
      )}

      {isReserveModalOpen && book && (
        <ReserveModal
          book={book}
          onClose={() => setIsReserveModalOpen(false)}
          onSuccess={handleReserveSuccess}
        />
      )}
    </MainLayout>
  );
};

export default BookDetailPage;
