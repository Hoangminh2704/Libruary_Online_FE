import React from "react";
import MainLayout from "../../../layouts/MainLayout";
import BookCard from "../../../components/specific/BookCard/BookCard";
import styles from "./HomePage.module.css";
import { MOCK_BOOKS } from "../../../data/mockBooks";

const HomePage = () => {
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
              Fiction
            </a>
            <a href="#" className={styles.tag}>
              Science
            </a>
            <a href="#" className={styles.tag}>
              History
            </a>
            <a href="#" className={styles.tag}>
              Biography
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
          <a href="#" className={styles.viewAll}>
            View All{" "}
            <span className="material-icons" style={{ fontSize: "1.25rem" }}>
              arrow_forward
            </span>
          </a>
        </div>

        <div className={styles.grid}>
          {MOCK_BOOKS.slice(0, 8).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
