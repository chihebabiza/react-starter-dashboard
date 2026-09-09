import { apiClient } from "@/lib/api-client";
import type {
  Author,
  AuthorCreate,
  AuthorUpdate,
} from "../types/category.types";

export const authorsApi = {
  getAll: () => apiClient<Author[]>("/Author"),

  getById: (id: number) => apiClient<Author>(`/Author/${id}`),

  create: (author: AuthorCreate) =>
    apiClient<Author>("/Author", {
      method: "POST",
      body: JSON.stringify(author),
    }),

  update: (id: number, author: AuthorUpdate) =>
    apiClient<Author>(`/Author/${id}`, {
      method: "PUT",
      body: JSON.stringify(author),
    }),

  delete: (id: number) =>
    apiClient<void>(`/Author/${id}`, {
      method: "DELETE",
    }),
};
