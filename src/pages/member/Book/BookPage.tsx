import React, { useState, useEffect } from "react";
import MainLayout from "../../../layouts/MainLayout";
import BookCard from "../../../components/specific/BookCard/BookCard";
import styles from "./BookPage.module.css";
import { bookService } from "../../../services/bookService";
import type { BookItem } from "../../../types/catalog.types";
import type { Book } from "../../../types/book.types";

const BooksPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState<Book[]>([]);
  const [booksWithGenres, setBooksWithGenres] = useState<BookItem[]>([]); // Store original data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const booksPerPage = 8;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState("Relevance");

  const convertToBook = (item: BookItem): Book => {
    const available = item.availableCount ?? item.availableCopies ?? 0;
    const total = item.copiesCount ?? item.totalCopies ?? 0;

    let status: "Available" | "Borrowed" | "Reserved" = "Available";

    if (item.calculatedStatus) {
      const backendStatus = item.calculatedStatus.toLowerCase();
      if (backendStatus === "available") {
        status = "Available";
      } else if (backendStatus === "limited") {
        status = "Reserved";
      } else {
        status = "Borrowed";
      }
    } else {
      if (total === 0 || available === 0) {
        status = "Borrowed";
      } else if (available <= total * 0.3) {
        status = "Reserved";
      } else {
        status = "Available";
      }
    }

    let authorNames = "Unknown Author";
    if (item.authorNames) {
      authorNames = item.authorNames;
    } else if (item.authors && item.authors.length > 0) {
      authorNames = item.authors.map((a) => a.author.name).join(", ");
    }

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
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookService.getAllBooks();

      console.log("📚 Books data received:", data);
      console.log("📚 Is array?", Array.isArray(data));

      if (!Array.isArray(data)) {
        console.error("❌ Data is not an array:", data);
        throw new Error("Invalid data format received from API");
      }

      setBooksWithGenres(data);
      const convertedBooks = data.map(convertToBook);
      setBooks(convertedBooks);
    } catch (err: unknown) {
      console.error("❌ Error fetching books:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load books";
      setError(errorMessage);
      setBooksWithGenres([]);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setShowOnlyAvailable(false);
    setCurrentPage(1);
  };

  const getFilteredAndSortedBooks = () => {
    let filtered = [...books];

    if (!Array.isArray(booksWithGenres)) {
      console.warn("⚠️ booksWithGenres is not an array:", booksWithGenres);
      return filtered;
    }

    const filteredWithGenres = [...booksWithGenres];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const filteredIds = new Set(
        filteredWithGenres
          .filter(
            (book) =>
              book.title.toLowerCase().includes(query) ||
              (book.authorNames?.toLowerCase().includes(query) ?? false) ||
              (book.authors || []).some((a) =>
                a.author.name.toLowerCase().includes(query)
              )
          )
          .map((b) => b.id)
      );
      filtered = filtered.filter((book) => filteredIds.has(book.id));
    }

    if (selectedCategories.length > 0) {
      const filteredIds = new Set(
        filteredWithGenres
          .filter((book) =>
            selectedCategories.some(
              (cat) =>
                book.genreNames?.includes(cat) ||
                (book.genres || []).some((g) => g.genre.name === cat)
            )
          )
          .map((b) => b.id)
      );
      filtered = filtered.filter((book) => filteredIds.has(book.id));
    }

    if (showOnlyAvailable) {
      filtered = filtered.filter((book) => book.status === "Available");
    }

    // 4. Sort
    switch (sortBy) {
      case "Newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      case "Title A-Z":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Relevance":
      default:
        break;
    }

    return filtered;
  };

  const filteredBooks = getFilteredAndSortedBooks();

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.container}>
          <div
            style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}
          >
            <p>Loading books...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className={styles.container}>
          <div
            style={{ textAlign: "center", padding: "3rem", color: "#ef4444" }}
          >
            <p>Error: {error}</p>
            <button
              onClick={fetchBooks}
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
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.filterHeader}>
            <h2 className={styles.filterTitle}>Filter Results</h2>
            <button className={styles.clearBtn} onClick={handleClearFilters}>
              Clear All
            </button>
          </div>

          <div className={styles.filtersList}>
            <details className={styles.filterGroup} open>
              <summary className={styles.groupSummary}>
                Categories
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px", color: "#94a3b8" }}
                >
                  expand_more
                </span>
              </summary>
              <div className={styles.filterContent}>
                {["Software", "Engineering", "Architecture"].map((cat) => (
                  <label key={cat} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </details>

            <details className={styles.filterGroup}>
              <summary className={styles.groupSummary}>
                Availability
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px", color: "#94a3b8" }}
                >
                  expand_more
                </span>
              </summary>
              <div className={styles.filterContent}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={showOnlyAvailable}
                    onChange={(e) => {
                      setShowOnlyAvailable(e.target.checked);
                      setCurrentPage(1);
                    }}
                  />
                  Show only available
                </label>
              </div>
            </details>

            <details className={styles.filterGroup}>
              <summary className={styles.groupSummary}>
                Year Range
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px", color: "#94a3b8" }}
                >
                  expand_more
                </span>
              </summary>
              <div className={styles.filterContent}>
                <input type="range" className={styles.rangeInput} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.75rem",
                    color: "#64748b",
                  }}
                >
                  <span>1900</span>
                  <span>2024</span>
                </div>
              </div>
            </details>
          </div>
        </aside>

        <div className={styles.contentArea}>
          <div className={styles.topBar}>
            <div className={styles.searchWrapper}>
              <span
                className={`material-symbols-outlined ${styles.searchIcon}`}
              >
                search
              </span>
              <input
                type="text"
                placeholder="Search catalog..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className={styles.sortWrapper}>
              <span className={styles.sortLabel}>Sort By:</span>
              <select
                className={styles.sortSelect}
                title="Sort books by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option>Relevance</option>
                <option>Newest</option>
                <option>Title A-Z</option>
              </select>
            </div>
          </div>

          <div className={styles.grid}>
            {currentBooks.length === 0 ? (
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "3rem",
                  color: "#64748b",
                }}
              >
                <p>No books found. Try adjusting your filters.</p>
              </div>
            ) : (
              currentBooks.map((book) => <BookCard key={book.id} book={book} />)
            )}
          </div>

          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <span className={`material-symbols-outlined ${styles.arrowIcon}`}>
                arrow_back
              </span>
              Prev
            </button>

            <div className={styles.pageNumbers}>
              {[...Array(Math.min(totalPages, 3))].map((_, i) => (
                <button
                  key={i + 1}
                  className={`${styles.pageNum} ${
                    currentPage === i + 1 ? styles.activePage : ""
                  }`}
                  onClick={() => handlePageClick(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              {totalPages > 3 && (
                <>
                  <span className={styles.ellipsis}>...</span>
                  <button
                    className={styles.pageNum}
                    onClick={() => handlePageClick(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              className={styles.pageBtn}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <span className={`material-symbols-outlined ${styles.arrowIcon}`}>
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BooksPage;
