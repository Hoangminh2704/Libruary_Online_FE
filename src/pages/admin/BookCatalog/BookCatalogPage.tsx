import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import AddBookModal from "../../../components/specific/AddBookModal/AddBookModal";
import styles from "./BookCatalogPage.module.css";
import { MOCK_CATALOG } from "../../../data/mockCatalog";

const BookCatalogPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusClass = (status: string) => {
    switch (status) {
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

  return (
    <AdminLayout>
      <div className={styles.pageWrapper}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.title}>Book Catalog</h1>
            <p className={styles.subtitle}>
              Manage your library's book collection
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

        {/* Controls & Table Container */}
        <div
          style={{
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1)",
          }}
        >
          {/* Filter Controls */}
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
              />
            </div>

            <select title="Filter by Category" className={styles.selectInput}>
              <option>All Categories</option>
              <option>Fiction</option>
              <option>Science</option>
            </select>

            <select title="Filter by Status" className={styles.selectInput}>
              <option>All Status</option>
              <option>Available</option>
              <option>Out of Stock</option>
            </select>

            <div style={{ flexGrow: 1 }}></div>

            <button className={styles.iconBtn}>
              <span className="material-symbols-outlined">filter_list</span>
            </button>
            <button className={styles.iconBtn}>
              <span className="material-symbols-outlined">download</span>
            </button>
          </div>

          {/* Table */}
          <div className={styles.tableWrapper}>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>ID</th>
                    <th className={styles.th}>Title</th>
                    <th className={styles.th}>Author</th>
                    <th className={styles.th}>Quantity</th>
                    <th className={styles.th}>Status</th>
                    <th className={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_CATALOG.map((book) => (
                    <tr key={book.id} className={styles.tr}>
                      <td className={`${styles.td} ${styles.tdMuted}`}>
                        {book.id}
                      </td>
                      <td className={styles.td}>
                        <div className={styles.bookTitle}>{book.title}</div>
                        <div className={styles.bookMeta}>
                          {book.genre} • {book.year}
                        </div>
                      </td>
                      <td className={`${styles.td} ${styles.tdSecondary}`}>
                        {book.author}
                      </td>
                      <td className={`${styles.td} ${styles.tdSecondary}`}>
                        {book.quantity}
                      </td>
                      <td className={styles.td}>
                        <span
                          className={`${styles.badge} ${getStatusClass(
                            book.status
                          )}`}
                        >
                          {book.status}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <div className={styles.actionGroup}>
                          <button
                            className={`${styles.actionBtn} ${styles.editIcon}`}
                          >
                            <span
                              className={`material-symbols-outlined ${styles.iconMedium}`}
                            >
                              edit
                            </span>
                          </button>
                          <button
                            className={`${styles.actionBtn} ${styles.deleteIcon}`}
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
                  ))}
                </tbody>
              </table>

              {/* Pagination Footer */}
              <div className={styles.pagination}>
                <span className={styles.pageInfo}>
                  Showing 1 to 6 of 247 results
                </span>
                <div className={styles.pageNav}>
                  <button className={styles.pageBtn}>Previous</button>
                  <button
                    className={`${styles.pageBtn} ${styles.pageBtnActive}`}
                  >
                    1
                  </button>
                  <button className={styles.pageBtn}>2</button>
                  <button className={styles.pageBtn}>3</button>
                  <span className={styles.pageEllipsis}>...</span>
                  <button className={styles.pageBtn}>42</button>
                  <button className={styles.pageBtn}>Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Book Modal */}
      <AddBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </AdminLayout>
  );
};

export default BookCatalogPage;
