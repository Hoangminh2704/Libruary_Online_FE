import type { Loan } from "../types/loan.types";

export const MOCK_LOANS: Loan[] = [
  {
    id: 1,
    bookTitle: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    borrowDate: "Oct 15, 2024",
    dueDate: "Nov 05, 2024",
    status: "Overdue",
  },
  {
    id: 2,
    bookTitle: "To Kill a Mockingbird",
    author: "Harper Lee",
    borrowDate: "Oct 20, 2024",
    dueDate: "Nov 10, 2024",
    status: "Overdue",
  },
  {
    id: 3,
    bookTitle: "1984",
    author: "George Orwell",
    borrowDate: "Nov 01, 2024",
    dueDate: "Nov 22, 2024",
    status: "Active",
  },
  {
    id: 4,
    bookTitle: "Pride and Prejudice",
    author: "Jane Austen",
    borrowDate: "Nov 03, 2024",
    dueDate: "Nov 24, 2024",
    status: "Active",
  },
  {
    id: 5,
    bookTitle: "The Catcher in the Rye",
    author: "J.D. Salinger",
    borrowDate: "Nov 08, 2024",
    dueDate: "Nov 29, 2024",
    status: "Due Soon",
  },
];
