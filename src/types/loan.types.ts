export interface Loan {
  id: number;
  bookTitle: string;
  author: string;
  borrowDate: string;
  dueDate: string;
  status: "Active" | "Overdue" | "Due Soon" | "Returned";
}

// API Response Types
export interface LoanItem {
  id: number;
  memberId: number;
  copyId: number;
  borrowDate: string;
  dueDate: string;
  returnDate?: string | null;
  status: "ACTIVE" | "RETURNED" | "OVERDUE";
  renewalCount?: number;
  createdAt: string;
  updatedAt: string;
  copy?: {
    id: number;
    bookId: number;
    inventoryCode: string;
    book?: {
      id: number;
      title: string;
      coverUrl?: string | null;
      authors?: Array<{
        author: {
          id: number;
          name: string;
        };
      }>;
    };
  };
}
