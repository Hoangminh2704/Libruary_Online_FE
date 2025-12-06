export interface Loan {
  id: number;
  bookTitle: string;
  author: string;
  borrowDate: string;
  dueDate: string;
  status: "Active" | "Overdue" | "Due Soon" | "Returned";
}
