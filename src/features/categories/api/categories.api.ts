import { apiClient } from "@/lib/api-client";
import type {
  Category,
  CategoryCreate,
  CategoryUpdate,
} from "../types/category.types";

export const categoriesApi = {
  getAll: () => apiClient<Category[]>("/Category"),

  getById: (id: number) => apiClient<Category>(`/Category/${id}`),

  create: (category: CategoryCreate) =>
    apiClient<number>("/Category", {
      method: "POST",
      body: JSON.stringify(category),
    }),

  update: (id: number, category: CategoryUpdate) =>
    apiClient<{ message: string }>(`/Category/${id}`, {
      method: "PUT",
      body: JSON.stringify(category),
    }),

  delete: (id: number) =>
    apiClient<void>(`/Category/${id}`, {
      method: "DELETE",
    }),
};
