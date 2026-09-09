import { apiClient } from "@/lib/api-client";
import type {
  Book,
  BookCreate,
  BookUpdate,
} from "@/features/books/types/book.types";

export const booksApi = {
  getAll: () => apiClient<Book[]>("/Book"),

  getById: (id: number) => apiClient<Book>(`/Book/${id}`),

  create: (book: BookCreate) =>
    apiClient<Book>("/Book", {
      method: "POST",
      body: JSON.stringify(book),
    }),

  update: (id: number, book: BookUpdate) =>
    apiClient<Book>(`/Book/${id}`, {
      method: "PUT",
      body: JSON.stringify(book),
    }),

  delete: (id: number) =>
    apiClient<void>(`/Book/${id}`, {
      method: "DELETE",
    }),
};
