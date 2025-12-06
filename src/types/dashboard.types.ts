export interface DashboardStats {
  totalBooks: number;
  booksOnLoan: number;
  overdueItems: number;
  totalMembers: number;
}

export interface Activity {
  id: number;
  type: "return" | "new_member" | "overdue" | "new_book";
  title: string;
  description: string;
  time: string;
}
