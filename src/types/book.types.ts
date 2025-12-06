export interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  rating: number;
  status: "Available" | "Borrowed" | "Reserved";
}
