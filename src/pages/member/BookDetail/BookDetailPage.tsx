import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import styles from "./BookDetailPage.module.css";
import { MOCK_BOOKS } from "../../../data/mockBooks";

const RELATED_BOOKS = [
  {
    id: 1,
    title: "Project Hail Mary",
    author: "Andy Weir",
    status: "Available",
    color: "green",
    img: "https://placehold.co/200x300?text=Hail+Mary",
  },
  {
    id: 2,
    title: "Artemis",
    author: "Andy Weir",
    status: "Reserved",
    color: "yellow",
    img: "https://placehold.co/200x300?text=Artemis",
  },
  {
    id: 3,
    title: "Seveneves",
    author: "Neal Stephenson",
    status: "Available",
    color: "green",
    img: "https://placehold.co/200x300?text=Seveneves",
  },
  {
    id: 4,
    title: "Red Mars",
    author: "Kim Stanley Robinson",
    status: "Available",
    color: "green",
    img: "https://placehold.co/200x300?text=Red+Mars",
  },
  {
    id: 5,
    title: "Aurora",
    author: "Kim Stanley Robinson",
    status: "Checked Out",
    color: "red",
    img: "https://placehold.co/200x300?text=Aurora",
  },
  {
    id: 6,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    status: "Available",
    color: "green",
    img: "https://placehold.co/200x300?text=Klara",
  },
];

const BookDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const book = MOCK_BOOKS.find((b) => b.id === Number(id));

  useEffect(() => {
    if (!book) {
      navigate("/user/homepage");
    }
  }, [book, navigate]);

  if (!book) {
    return null;
  }

  return (
    <MainLayout>
      <div className={styles.pageContainer}>
        <nav className={styles.breadcrumb}>
          <a href="/user/homepage" className={styles.breadcrumbLink}>
            Home
          </a>
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
                src={book.coverImage}
                alt={`${book.title} Book Cover`}
                className={styles.coverImage}
              />
            </div>
          </div>

          <div className={styles.infoColumn}>
            <div className={styles.headerRow}>
              <div>
                <h1 className={styles.bookTitle}>{book.title}</h1>
                <p className={styles.bookAuthor}>by {book.author}</p>
              </div>
              <button className={styles.favoriteBtn}>
                <span
                  className="material-symbols-outlined"
                  style={{ color: "#6B7280" }}
                >
                  favorite_border
                </span>
              </button>
            </div>

            <div className={styles.metaRow}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-icons">
                    {i < Math.floor(book.rating)
                      ? "star"
                      : i < book.rating
                      ? "star_half"
                      : "star_border"}
                  </span>
                ))}
              </div>
              <span className={styles.ratingText}>
                {book.rating} (2,847 reviews)
              </span>
              <span className={styles.statusBadge}>{book.status}</span>
            </div>

            <div className={styles.descriptionSection}>
              <h2 className={styles.sectionHeading}>Description</h2>
              <p className={styles.descriptionText}>
                Six days ago, astronaut Mark Watney became one of the first
                people to walk on Mars. Now, he's sure he'll be the first person
                to die there. After a dust storm nearly kills him and forces his
                crew to evacuate while thinking him dead, Mark finds himself
                stranded and completely alone.
              </p>
              <p className={styles.descriptionText}>
                Chances are, though, he won't have time to starve to death. The
                damaged machinery, unforgiving environment, or plain-old "human
                error" are much more likely to kill him first. But Mark isn't
                ready to give up yet.
              </p>
            </div>

            <div className={styles.infoGrid}>
              <div>
                <div className={styles.infoLabel}>ISBN:</div>
                <div className={styles.infoValue}>978-0-553-41802-6</div>
              </div>
              <div>
                <div className={styles.infoLabel}>Pages:</div>
                <div className={styles.infoValue}>369</div>
              </div>
              <div>
                <div className={styles.infoLabel}>Publication Year:</div>
                <div className={styles.infoValue}>2011</div>
              </div>
              <div>
                <div className={styles.infoLabel}>Language:</div>
                <div className={styles.infoValue}>English</div>
              </div>
              <div>
                <div className={styles.infoLabel}>Publisher:</div>
                <div className={styles.infoValue}>Crown Publishing</div>
              </div>
              <div>
                <div className={styles.infoLabel}>Genre:</div>
                <div className={styles.infoValue}>Science Fiction</div>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.btnPrimary}>
                <span className="material-symbols-outlined">book</span>
                Borrow Now
              </button>
              <button className={styles.btnOutline}>
                <span className="material-symbols-outlined">bookmark_add</span>
                Reserve Book
              </button>
              <button className={styles.btnIcon}>
                <span className="material-symbols-outlined">share</span>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.relatedSection}>
          <div className={styles.relatedHeader}>
            <h2
              className={styles.sectionHeading}
              style={{ fontSize: "1.5rem", marginBottom: 0 }}
            >
              Related Books
            </h2>
            <a href="/user/homepage" className={styles.viewAllLink}>
              View all{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>

          <div className={styles.relatedGrid}>
            {RELATED_BOOKS.map((relatedBook) => (
              <div
                key={relatedBook.id}
                className={styles.relatedCard}
                onClick={() => navigate(`/user/book/${relatedBook.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={relatedBook.img}
                  alt={relatedBook.title}
                  className={styles.relatedImage}
                />
                <div>
                  <h3 className={styles.relatedTitle}>{relatedBook.title}</h3>
                  <p className={styles.relatedAuthor}>{relatedBook.author}</p>
                  <p
                    className={styles.relatedStatus}
                    style={{
                      color:
                        relatedBook.color === "green"
                          ? "#166534"
                          : relatedBook.color === "yellow"
                          ? "#CA8A04"
                          : "#991B1B",
                    }}
                  >
                    {relatedBook.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookDetailPage;
