import axiosClient from "./axiosClient";
import { bookService } from "./bookService";
import { memberService } from "./memberService";
import type { DashboardStats } from "../types/dashboard.types";
import type { BookItem } from "../types/catalog.types";

export const dashboardService = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const [books, members] = await Promise.all([
      bookService.getAllBooks(),
      memberService.getAllMembers(),
    ]);

    const totalBooks = books.length;
    const totalMembers = members.length;

    let booksOnLoan = 0;
    let overdueItems = 0;

    books.forEach((book: BookItem) => {
      const total =
        book.copiesCount ?? book.totalCopies ?? book.copies?.length ?? 0;
      const available =
        book.availableCount ??
        book.availableCopies ??
        book.copies?.filter((c) => c.status === "AVAILABLE").length ??
        0;
      booksOnLoan += total - available;
    });

    try {
      const response = await axiosClient.get<{ count: number }>(
        "/loans/overdue/count"
      );
      overdueItems = (response as unknown as { count: number }).count;
    } catch {
      overdueItems = 0;
    }

    const stats: DashboardStats = {
      totalBooks,
      booksOnLoan,
      overdueItems,
      totalMembers,
    };

    return stats;
  },
};

export default dashboardService;
