import type { Book } from "../types/book.types";

export const MOCK_BOOKS: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage:
      "https://placehold.co/400x600/e2e8f0/1e293b?text=The+Great+Gatsby",
    rating: 4.5,
    status: "Available",
  },
  {
    id: 2,
    title: "Sapiens: A Brief History",
    author: "Yuval Noah Harari",
    coverImage: "https://placehold.co/400x600/e2e8f0/1e293b?text=Sapiens",
    rating: 4.2,
    status: "Available",
  },
  {
    id: 3,
    title: "Harry Potter Collection",
    author: "J.K. Rowling",
    coverImage: "https://placehold.co/400x600/e2e8f0/1e293b?text=Harry+Potter",
    rating: 4.9,
    status: "Borrowed",
  },
  {
    id: 4,
    title: "The Hidden Life of Trees",
    author: "Peter Wohlleben",
    coverImage:
      "https://placehold.co/400x600/e2e8f0/1e293b?text=Hidden+Life+of+Trees",
    rating: 4.3,
    status: "Available",
  },
  {
    id: 5,
    title: "1984",
    author: "George Orwell",
    coverImage: "https://placehold.co/400x600/e2e8f0/1e293b?text=1984",
    rating: 4.7,
    status: "Available",
  },
  {
    id: 6,
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "https://placehold.co/400x600/e2e8f0/1e293b?text=Atomic+Habits",
    rating: 4.8,
    status: "Available",
  },
  {
    id: 7,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    coverImage:
      "https://placehold.co/400x600/e2e8f0/1e293b?text=The+Silent+Patient",
    rating: 4.1,
    status: "Borrowed",
  },
  {
    id: 8,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage:
      "https://placehold.co/400x600/e2e8f0/1e293b?text=Pride+and+Prejudice",
    rating: 4.6,
    status: "Available",
  },
];
