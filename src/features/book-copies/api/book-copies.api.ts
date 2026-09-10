import { apiClient } from "@/lib/api-client";
import type { BookCopy } from "../types/book-copy.types";

export const bookCopiesApi = {
  getByBookId: (bookId: number) => apiClient<BookCopy[]>(`/BookCopy/${bookId}`),
};
