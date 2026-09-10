import { apiClient } from "@/lib/api-client";
import type { Member, MemberCreate, MemberUpdate } from "../types/member.types";

export const membersApi = {
  getAll: () => apiClient<Member[]>("/Member"),

  getById: (id: number) => apiClient<Member>(`/Member/${id}`),

  create: (member: MemberCreate) =>
    apiClient<Member>("/Member", {
      method: "POST",
      body: JSON.stringify(member),
    }),

  update: (id: number, member: MemberUpdate) =>
    apiClient<Member>(`/Member/${id}`, {
      method: "PUT",
      body: JSON.stringify(member),
    }),

  delete: (id: number) =>
    apiClient<void>(`/Member/${id}`, {
      method: "DELETE",
    }),
};
