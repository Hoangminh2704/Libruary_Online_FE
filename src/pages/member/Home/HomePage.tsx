import { useState, useEffect } from "react";
import MainLayout from "../../../layouts/MainLayout";
import BookCard from "../../../components/specific/BookCard/BookCard";
import styles from "./HomePage.module.css";
import { bookService } from "../../../services/bookService";
import type { BookItem } from "../../../types/catalog.types";
import type { Book } from "../../../types/book.types";

const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const convertToBook = (item: BookItem): Book => {
    const available = item.availableCount ?? item.availableCopies ?? 0;
    const total = item.copiesCount ?? item.totalCopies ?? 0;

    let status: "Available" | "Borrowed" | "Reserved" = "Available";
    if (item.calculatedStatus) {
      const backendStatus = item.calculatedStatus.toLowerCase();
      if (backendStatus === "available") status = "Available";
      else if (backendStatus === "limited") status = "Reserved";
      else status = "Borrowed";
    } else {
      if (total === 0 || available === 0) status = "Borrowed";
      else if (available <= total * 0.3) status = "Reserved";
      else status = "Available";
    }

    const authorNames =
      item.authorNames ||
      (item.authors || []).map((a) => a.author.name).join(", ") ||
      "Unknown Author";

    return {
      id: item.id,
      title: item.title,
      author: authorNames,
      coverImage:
        item.coverUrl || "https://via.placeholder.com/200x300?text=No+Cover",
      rating: 4.5,
      status,
    };
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await bookService.getAllBooks();
        const convertedBooks = data.map(convertToBook);
        setBooks(convertedBooks);
      } catch (err: unknown) {
        console.error("❌ Error fetching books:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load books";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);
  return (
    <MainLayout>
      <section className={styles.hero}>
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>

        <div className={styles.heroContent}>
          <h1 className={styles.title}>Discover Your Next Great Read</h1>
          <p className={styles.subtitle}>
            Explore thousands of books, journals, and resources. Your knowledge
            journey starts here.
          </p>

          <div className={styles.searchBox}>
            <div className={styles.inputWrapper}>
              <span className="material-icons" style={{ color: "#9CA3AF" }}>
                search
              </span>
              <input
                type="text"
                placeholder="Search for books, authors, or ISBN..."
                className={styles.input}
              />
            </div>
            <button className={styles.searchBtn}>Search</button>
          </div>

          <div className={styles.tags}>
            <span
              style={{
                fontSize: "0.875rem",
                color: "#BFDBFE",
                marginRight: "0.5rem",
              }}
            >
              Popular searches:
            </span>
            <a href="#" className={styles.tag}>
              Software
            </a>
            <a href="#" className={styles.tag}>
              Engineering
            </a>
            <a href="#" className={styles.tag}>
              Architecture
            </a>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Featured Books</h2>
            <p style={{ color: "#6B7280", marginTop: "0.25rem" }}>
              Handpicked selections from our collection
            </p>
          </div>
          <a href="/user/books" className={styles.viewAll}>
            View All{" "}
            <span className="material-icons" style={{ fontSize: "1.25rem" }}>
              arrow_forward
            </span>
          </a>
        </div>

        {loading ? (
          <div
            style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}
          >
            <p>Loading books...</p>
          </div>
        ) : error ? (
          <div
            style={{ textAlign: "center", padding: "3rem", color: "#ef4444" }}
          >
            <p>Error: {error}</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {books.slice(0, 8).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default HomePage;
