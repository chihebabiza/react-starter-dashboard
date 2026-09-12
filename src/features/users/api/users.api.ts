import { apiClient } from "@/lib/api-client";
import type { User, UserCreate, UserUpdate } from "../types/user.types";

export const usersApi = {
  getAll: () => apiClient<User[]>("/User"),

  getById: (id: number) => apiClient<User>(`/User/${id}`),

  create: (user: UserCreate) =>
    apiClient<User>("/User", {
      method: "POST",
      body: JSON.stringify(user),
    }),

  update: (id: number, user: UserUpdate) =>
    apiClient<User>(`/User/${id}`, {
      method: "PUT",
      body: JSON.stringify(user),
    }),

  delete: (id: number) =>
    apiClient<void>(`/User/${id}`, {
      method: "DELETE",
    }),
};
