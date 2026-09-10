import { useQuery } from "@tanstack/react-query";

import { bookCopiesApi } from "@/features/book-copies/api/book-copies.api";

export function useBookCopies(bookId: number) {
  return useQuery({
    queryKey: ["book-copies", bookId],
    queryFn: () => bookCopiesApi.getByBookId(bookId),
    enabled: bookId > 0,
  });
}
