import axiosClient from "./axiosClient";
import type { BookItem, CreateBookRequest } from "../types/catalog.types";

interface PaginatedResponse<T> {
  data: T[];
  pagination?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export const bookService = {
  getAllBooks: async (): Promise<BookItem[]> => {
    const response = await axiosClient.get<BookItem[]>("/catalog/books");

    if (response && typeof response === "object" && "data" in response) {
      return (response as PaginatedResponse<BookItem>).data;
    }

    return response as unknown as BookItem[];
  },

  getBookById: async (id: string | number): Promise<BookItem> => {
    const response = await axiosClient.get<BookItem>(`/catalog/books/${id}`);
    return response as unknown as BookItem;
  },

  createBook: async (data: CreateBookRequest): Promise<BookItem> => {
    const response = await axiosClient.post<BookItem>("/catalog/books", data);
    return response as unknown as BookItem;
  },

  updateBook: async (
    id: string | number,
    data: Partial<CreateBookRequest>
  ): Promise<BookItem> => {
    const response = await axiosClient.patch<BookItem>(
      `/catalog/books/${id}`,
      data
    );
    return response as unknown as BookItem;
  },

  deleteBook: async (id: string | number): Promise<void> => {
    await axiosClient.delete(`/catalog/books/${id}`);
  },
};
