import React, { useState } from "react";
import styles from "./AddBookModal.module.css";
import { bookService } from "../../../services/bookService";
import type { CreateBookRequest } from "../../../types/catalog.types";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    isbn: "",
    description: "",
    publisher: "",
    publicationYear: "",
    language: "",
    coverUrl: "",
    authors: "",
    genres: "",
    copiesCount: "1",
  });
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableGenres = ["Software", "Engineering", "Architecture"];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }
      setCoverImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (selectedGenres.length === 0) {
        setError("Please select at least one genre");
        setIsSubmitting(false);
        return;
      }

      let finalCoverUrl = formData.coverUrl;

      if (uploadMethod === "file" && coverImageFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("image", coverImageFile);

        try {
          const uploadResponse = await fetch("/api/upload/image", {
            method: "POST",
            body: formDataUpload,
          });
          const uploadData = await uploadResponse.json();
          finalCoverUrl = uploadData.url;
        } catch {
          setError("Failed to upload image. Please use URL method instead.");
        }
      }

      const bookData: CreateBookRequest = {
        title: formData.title,
        subtitle: formData.subtitle || undefined,
        isbn: formData.isbn || undefined,
        description: formData.description || undefined,
        publisher: formData.publisher || undefined,
        publicationYear: formData.publicationYear
          ? parseInt(formData.publicationYear)
          : undefined,
        language: formData.language || undefined,
        coverUrl: finalCoverUrl || undefined,
        authors: formData.authors
          ? formData.authors
              .split(",")
              .map((a) => a.trim())
              .filter((a) => a)
          : undefined,
        genres: selectedGenres.length > 0 ? selectedGenres : undefined,
        copiesCount: formData.copiesCount ? parseInt(formData.copiesCount) : 1,
      };

      await bookService.createBook(bookData);

      alert("Book added successfully!");

      setFormData({
        title: "",
        subtitle: "",
        isbn: "",
        description: "",
        publisher: "",
        publicationYear: "",
        language: "",
        coverUrl: "",
        authors: "",
        genres: "",
        copiesCount: "1",
      });
      setSelectedGenres([]);
      setCoverImageFile(null);
      setCoverPreview("");

      onClose();
    } catch (err) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      setError(error.response?.data?.message || "Failed to create book");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
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

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.errorBox}>{error}</div>}

          <div>
            <label className={styles.label}>Book Cover Image</label>
            <div className={styles.uploadMethodSelector}>
              <button
                type="button"
                className={`${styles.methodBtn} ${
                  uploadMethod === "url" ? styles.methodBtnActive : ""
                }`}
                onClick={() => setUploadMethod("url")}
              >
                <span className="material-symbols-outlined">link</span>
                URL
              </button>
              <button
                type="button"
                className={`${styles.methodBtn} ${
                  uploadMethod === "file" ? styles.methodBtnActive : ""
                }`}
                onClick={() => setUploadMethod("file")}
              >
                <span className="material-symbols-outlined">upload_file</span>
                Upload File
              </button>
            </div>

            {uploadMethod === "url" ? (
              <input
                type="text"
                name="coverUrl"
                placeholder="https://example.com/cover.jpg"
                className={styles.input}
                value={formData.coverUrl}
                onChange={handleChange}
              />
            ) : (
              <div>
                <label htmlFor="coverImageUpload" className={styles.srOnly}>
                  Choose Image File
                </label>
                <input
                  id="coverImageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className={styles.fileInput}
                />
                {coverPreview && (
                  <div className={styles.imagePreview}>
                    <img src={coverPreview} alt="Cover preview" />
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label className={styles.label}>
              Book Title <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter book title"
              className={styles.input}
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className={styles.label}>Subtitle</label>
            <input
              type="text"
              name="subtitle"
              placeholder="Enter subtitle (optional)"
              className={styles.input}
              value={formData.subtitle}
              onChange={handleChange}
            />
          </div>

          <div className={styles.row}>
            <div>
              <label className={styles.label}>
                Author Names <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="authors"
                placeholder="e.g., Andy Weir, Robert C. Martin"
                className={styles.input}
                value={formData.authors}
                onChange={handleChange}
                required
              />
              <p className={styles.helpText}>
                Enter author names separated by commas
              </p>
            </div>
            <div>
              <label className={styles.label}>
                ISBN <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="isbn"
                placeholder="978-0-00-000000-0"
                className={styles.input}
                value={formData.isbn}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <label className={styles.label}>
                Genres <span className={styles.required}>*</span>
              </label>
              <div className={styles.genreCheckboxes}>
                {availableGenres.map((genre) => (
                  <label key={genre} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleGenreToggle(genre)}
                      className={styles.checkbox}
                    />
                    <span>{genre}</span>
                  </label>
                ))}
              </div>
              <p className={styles.helpText}>
                Select one or more genres for this book
              </p>
            </div>
            <div>
              <label className={styles.label}>Publication Year</label>
              <input
                type="number"
                name="publicationYear"
                placeholder="2024"
                className={styles.input}
                value={formData.publicationYear}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <label className={styles.label}>
                Number of Copies <span className={styles.required}>*</span>
              </label>
              <input
                type="number"
                name="copiesCount"
                placeholder="1"
                min="1"
                max="100"
                className={styles.input}
                value={formData.copiesCount}
                onChange={handleChange}
                required
              />
              <p className={styles.helpText}>
                How many physical copies to add to inventory
              </p>
            </div>
            <div></div>
          </div>

          <div className={styles.row}>
            <div>
              <label className={styles.label}>Publisher</label>
              <input
                type="text"
                name="publisher"
                placeholder="Publisher name"
                className={styles.input}
                value={formData.publisher}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className={styles.label}>Language</label>
              <input
                type="text"
                name="language"
                placeholder="e.g., English"
                className={styles.input}
                value={formData.language}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className={styles.label}>Description</label>
            <textarea
              name="description"
              placeholder="Enter book description"
              className={styles.input}
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.btnSave}
              disabled={isSubmitting}
            >
              <span className={`material-symbols-outlined ${styles.iconSmall}`}>
                {isSubmitting ? "hourglass_empty" : "check"}
              </span>
              {isSubmitting ? "Saving..." : "Save Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
