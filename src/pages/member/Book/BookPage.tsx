import React, { useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import BookCard from "../../../components/specific/BookCard/BookCard";
import styles from "./BookPage.module.css";
import { MOCK_BOOKS } from "../../../data/mockBooks";

const BooksPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  // Tính toán books hiển thị cho trang hiện tại
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = MOCK_BOOKS.slice(indexOfFirstBook, indexOfLastBook);

  // Tính tổng số trang
  const totalPages = Math.ceil(MOCK_BOOKS.length / booksPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.filterHeader}>
            <h2 className={styles.filterTitle}>Filter Results</h2>
            <button className={styles.clearBtn}>Clear All</button>
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
                {["Fiction", "Science", "History", "Biography"].map((cat) => (
                  <label key={cat} className={styles.checkboxLabel}>
                    <input type="checkbox" className={styles.checkbox} />
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
                  <input type="checkbox" className={styles.checkbox} />
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

        {/* --- RIGHT CONTENT (GRID) --- */}
        <div className={styles.contentArea}>
          {/* Top Bar: Search & Sort */}
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
              />
            </div>
            <div className={styles.sortWrapper}>
              <span className={styles.sortLabel}>Sort By:</span>
              <select className={styles.sortSelect}>
                <option>Relevance</option>
                <option>Newest</option>
                <option>Title A-Z</option>
              </select>
            </div>
          </div>

          {/* Book Grid */}
          <div className={styles.grid}>
            {currentBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {/* Pagination */}
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
