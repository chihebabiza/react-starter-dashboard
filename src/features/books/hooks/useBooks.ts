import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { booksApi } from "@/features/books/api/books.api";

import type { BookCreate, BookUpdate } from "@/features/books/types/book.types";

const BOOKS_QUERY_KEY = ["books"];

// GET all
export function useBooks() {
  return useQuery({
    queryKey: BOOKS_QUERY_KEY,
    queryFn: booksApi.getAll,
  });
}

// CREATE
export function useCreateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (book: BookCreate) => booksApi.create(book),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: BOOKS_QUERY_KEY,
      });
    },
  });
}

// UPDATE
export function useUpdateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, book }: { id: number; book: BookUpdate }) =>
      booksApi.update(id, book),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: BOOKS_QUERY_KEY,
      });
    },
  });
}

// DELETE
export function useDeleteBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => booksApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: BOOKS_QUERY_KEY,
      });
    },
  });
}
