import React from "react";
import styles from "./AddBookModal.module.css";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.iconBox}>
            <span className={`material-symbols-outlined ${styles.iconLarge}`}>
              menu_book
            </span>
          </div>
          <div>
            <h2 className={styles.title}>Add New Book</h2>
            <p className={styles.subtitle}>
              Fill in the details to add a new book to your library
            </p>
          </div>
        </div>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className={styles.label}>Book Cover</label>
            <div className={styles.uploadArea}>
              <div className={styles.uploadIconCircle}>
                <span className="material-symbols-outlined">cloud_upload</span>
              </div>
              <div className={styles.uploadText}>
                <span className={styles.uploadHighlight}>Click to upload</span>{" "}
                or drag and drop
              </div>
              <p className={styles.uploadHint}>PNG, JPG or WEBP (max. 5MB)</p>
              <input
                title="Book Cover"
                type="file"
                className={styles.hiddenInput}
              />
            </div>
          </div>

          <div>
            <label className={styles.label}>
              Book Title <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter book title"
              className={styles.input}
            />
          </div>

          <div className={styles.row}>
            <div>
              <label className={styles.label}>
                Author <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter author name"
                className={styles.input}
              />
            </div>
            <div>
              <label className={styles.label}>
                ISBN <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="978-0-00-000000-0"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <label className={styles.label}>
                Category <span className={styles.required}>*</span>
              </label>
              <select title="Category" className={styles.select}>
                <option>Select a category</option>
                <option>Fiction</option>
                <option>Non-Fiction</option>
                <option>Science</option>
                <option>History</option>
              </select>
            </div>
            <div>
              <label className={styles.label}>
                Quantity <span className={styles.required}>*</span>
              </label>
              <input
                title="Quantity"
                type="number"
                defaultValue={0}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.btnSave}>
              <span className={`material-symbols-outlined ${styles.iconSmall}`}>
                check
              </span>
              Save Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
