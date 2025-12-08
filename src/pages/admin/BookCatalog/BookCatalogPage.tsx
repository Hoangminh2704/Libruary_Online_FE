import React, { useState, useEffect } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import AddBookModal from "../../../components/specific/AddBookModal/AddBookModal";
import styles from "./BookCatalogPage.module.css";
import { bookService } from "../../../services/bookService";
import type { BookItem } from "../../../types/catalog.types";

const BookCatalogPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookService.getAllBooks();
      console.log("📚 Books data received:", data);

      if (data.length > 0) {
        console.log("🔍 First book structure:", {
          id: data[0].id,
          title: data[0].title,
          copies: data[0].copies,
          copiesCount: data[0].copiesCount,
          totalCopies: data[0].totalCopies,
          availableCount: data[0].availableCount,
          availableCopies: data[0].availableCopies,
          calculatedStatus: data[0].calculatedStatus,
        });
      }

      setBooks(data);
    } catch (err: any) {
      console.error("❌ Error fetching books:", err);
      const msg =
        err.response?.data?.message || err.message || "Failed to load books";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await bookService.deleteBook(id);
      await fetchBooks();
    } catch (err: any) {
      console.error("❌ Error deleting book:", err);
      const msg = err.response?.data?.message || "Failed to delete book";
      alert(msg);
    }
  };

  const getStatusText = (book: BookItem) => {
    if (book.calculatedStatus) {
      return book.calculatedStatus;
    }

    const available =
      book.availableCount ??
      book.availableCopies ??
      book.copies?.filter((c) => c.status === "AVAILABLE").length ??
      0;

    const total =
      book.copiesCount ?? book.totalCopies ?? book.copies?.length ?? 0;

    if (total === 0) return "Out of Stock";
    if (available === 0) return "Out of Stock";
    if (available <= total * 0.3) return "Limited";
    return "Available";
  };

  const getStatusClass = (statusText: string) => {
    switch (statusText) {
      case "Available":
        return styles.statusAvailable;
      case "Limited":
        return styles.statusLimited;
      case "Out of Stock":
        return styles.statusOutOfStock;
      default:
        return styles.statusAvailable;
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (book.authorNames?.toLowerCase().includes(searchQuery.toLowerCase()) ??
        false) ||
      (book.authors || []).some((a) =>
        a.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All Categories" ||
      (book.genreNames?.includes(selectedCategory) ?? false) ||
      (book.genres || []).some((g) => g.genre.name === selectedCategory);

    const currentStatus = getStatusText(book);
    const matchesStatus =
      selectedStatus === "All Status" || currentStatus === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
          <p>Loading books...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div style={{ textAlign: "center", padding: "3rem", color: "#ef4444" }}>
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
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.title}>Book Catalog</h1>
            <p className={styles.subtitle}>
              Manage your library's book collection ({books.length} books)
            </p>
          </div>
          <button
            className={styles.addBtn}
            onClick={() => setIsModalOpen(true)}
          >
            <span className="material-symbols-outlined">add</span>
            Add New Book
          </button>
        </div>

        <div className={styles.tableWrapper}>
          <div className={styles.controls}>
            <div className={styles.searchWrapper}>
              <span
                className={`material-symbols-outlined ${styles.searchIcon}`}
              >
                search
              </span>
              <input
                type="text"
                placeholder="Search books..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              className={styles.selectInput}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option>All Categories</option>
              <option>Software</option>
              <option>Engineering</option>
              <option>Architecture</option>
            </select>

            <select
              className={styles.selectInput}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option>All Status</option>
              <option>Available</option>
              <option>Limited</option>
              <option>Out of Stock</option>
            </select>

            <div style={{ flexGrow: 1 }}></div>

            <button
              className={styles.iconBtn}
              onClick={fetchBooks}
              title="Refresh"
            >
              <span className="material-symbols-outlined">refresh</span>
            </button>
            <button className={styles.iconBtn}>
              <span className="material-symbols-outlined">download</span>
            </button>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>ID</th>
                  <th className={styles.th}>Title</th>
                  <th className={styles.th}>Author(s)</th>
                  <th className={styles.th}>Copies</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        textAlign: "center",
                        padding: "3rem",
                        color: "#64748b",
                      }}
                    >
                      No books found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredBooks.map((book) => {
                    const statusText = getStatusText(book);

                    const available =
                      book.availableCount ??
                      book.availableCopies ??
                      book.copies?.filter((c) => c.status === "AVAILABLE")
                        .length ??
                      0;

                    const total =
                      book.copiesCount ??
                      book.totalCopies ??
                      book.copies?.length ??
                      0;

                    return (
                      <tr key={book.id} className={styles.tr}>
                        <td className={`${styles.td} ${styles.tdMuted}`}>
                          #{book.id}
                        </td>

                        <td className={styles.td}>
                          <div className={styles.bookTitle}>{book.title}</div>
                          <div className={styles.bookMeta}>
                            {book.genreNames || "No Genre"}
                            {" • "}
                            {book.publicationYear || "N/A"}
                          </div>
                        </td>

                        <td className={`${styles.td} ${styles.tdSecondary}`}>
                          {book.authorNames || "Unknown"}
                        </td>

                        <td className={`${styles.td} ${styles.tdSecondary}`}>
                          {available} / {total}
                        </td>

                        <td className={styles.td}>
                          <span
                            className={`${styles.badge} ${getStatusClass(
                              statusText
                            )}`}
                          >
                            {statusText}
                          </span>
                        </td>

                        <td className={styles.td}>
                          <div className={styles.actionGroup}>
                            <button
                              className={`${styles.actionBtn} ${styles.editIcon}`}
                              title="Edit book"
                            >
                              <span
                                className={`material-symbols-outlined ${styles.iconMedium}`}
                              >
                                edit
                              </span>
                            </button>
                            <button
                              className={`${styles.actionBtn} ${styles.deleteIcon}`}
                              onClick={() => handleDeleteBook(book.id)}
                              title="Delete book"
                            >
                              <span
                                className={`material-symbols-outlined ${styles.iconMedium}`}
                              >
                                delete
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            <div className={styles.pagination}>
              <span className={styles.pageInfo}>
                Showing {filteredBooks.length} of {books.length} books
              </span>
              <div className={styles.pageNav}>
                <button className={styles.pageBtn} disabled>
                  Previous
                </button>
                <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>
                  1
                </button>
                <button className={styles.pageBtn} disabled>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddBookModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchBooks();
        }}
      />
    </AdminLayout>
  );
};

export default BookCatalogPage;
