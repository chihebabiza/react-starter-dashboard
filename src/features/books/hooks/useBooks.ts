import { useQuery } from "@tanstack/react-query";
import { booksApi } from "@/features/books/api/books.api";

export function useBooks() {
  return useQuery({
    queryKey: ["books"],
    queryFn: booksApi.getAll,
  });
}
