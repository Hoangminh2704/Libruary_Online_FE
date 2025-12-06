export interface BookItem {
  id: string;
  title: string;
  genre: string;
  year: string;
  author: string;
  quantity: number;
  status: "Available" | "Limited" | "Out of Stock";
}
