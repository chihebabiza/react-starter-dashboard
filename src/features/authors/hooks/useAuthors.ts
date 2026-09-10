import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { authorsApi } from "@/features/authors/api/authors.api";

import type {
  AuthorCreate,
  AuthorUpdate,
} from "@/features/authors/types/author.types";

const AUTHORS_QUERY_KEY = ["authors"];

// GET all
export function useAuthors() {
  return useQuery({
    queryKey: AUTHORS_QUERY_KEY,
    queryFn: authorsApi.getAll,
  });
}

// CREATE
export function useCreateAuthor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (author: AuthorCreate) => authorsApi.create(author),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: AUTHORS_QUERY_KEY,
      });
    },
  });
}

// UPDATE
export function useUpdateAuthor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, author }: { id: number; author: AuthorUpdate }) =>
      authorsApi.update(id, author),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: AUTHORS_QUERY_KEY,
      });
    },
  });
}

// DELETE
export function useDeleteAuthor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => authorsApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: AUTHORS_QUERY_KEY,
      });
    },
  });
}
