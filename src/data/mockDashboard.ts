import type { DashboardStats, Activity } from "../types/dashboard.types";

export const MOCK_STATS: DashboardStats = {
  totalBooks: 12847,
  booksOnLoan: 3642,
  overdueItems: 127,
  totalMembers: 8924,
};

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 1,
    type: "return",
    title: "Book returned",
    description: '"The Great Gatsby" by John Doe',
    time: "2 minutes ago",
  },
  {
    id: 2,
    type: "new_member",
    title: "New member registered",
    description: "Emma Wilson joined",
    time: "15 minutes ago",
  },
  {
    id: 3,
    type: "overdue",
    title: "Overdue reminder sent",
    description: "To 5 members",
    time: "1 hour ago",
  },
  {
    id: 4,
    type: "new_book",
    title: "New books added",
    description: "25 new titles to catalog",
    time: "3 hours ago",
  },
];
