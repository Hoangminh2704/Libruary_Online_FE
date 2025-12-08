export interface Author {
  id: number;
  name: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Genre {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BookAuthor {
  bookId: number;
  authorId: number;
  author: Author;
}

export interface BookGenre {
  bookId: number;
  genreId: number;
  genre: Genre;
}

export interface Copy {
  id: number;
  bookId?: number;
  inventoryCode: string;
  status: "AVAILABLE" | "LOANED" | "RESERVED" | "LOST" | "MAINTENANCE";
  location?: string | null;
  acquiredAt?: string | null;
  conditionNotes?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface BookItem {
  id: number;
  title: string;
  subtitle?: string | null;
  isbn?: string | null;
  description?: string | null;
  publisher?: string | null;
  publicationYear?: number | null;
  language?: string | null;
  coverUrl?: string | null;
  authors: BookAuthor[];
  genres: BookGenre[];
  copies?: Copy[];
  reservations?: unknown[];
  totalCopies?: number;
  availableCopies?: number;
  // Backend computed fields
  authorNames?: string;
  genreNames?: string;
  copiesCount?: number;
  availableCount?: number;
  calculatedStatus?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookRequest {
  title: string;
  subtitle?: string;
  isbn?: string;
  description?: string;
  publisher?: string;
  publicationYear?: number;
  language?: string;
  coverUrl?: string;
  authorIds: number[];
  genreIds: number[];
}
