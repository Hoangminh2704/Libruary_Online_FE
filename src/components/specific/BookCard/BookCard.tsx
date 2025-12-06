import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BookCard.module.css";
import type { Book } from "../../../types/book.types";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user/book/${book.id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img src={book.coverImage} alt={book.title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>{book.author}</p>
      </div>
      <div className={styles.footer}>
        <div className={styles.rating}>
          <span className="material-icons" style={{ fontSize: "16px" }}>
            star
          </span>
          <span className={styles.ratingScore}>({book.rating})</span>
        </div>
        <span
          className={`${styles.badge} ${
            book.status === "Available"
              ? styles.badgeAvailable
              : styles.badgeBorrowed
          }`}
        >
          {book.status}
        </span>
      </div>
    </div>
  );
};

export default BookCard;
