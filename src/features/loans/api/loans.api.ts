import { apiClient } from "@/lib/api-client";
import type {
  Loan,
  LoanCreate,
  LoanUpdate,
} from "@/features/loans/types/loan.types";

export const loansApi = {
  getByMemberId: (memberId: number) =>
    apiClient<Loan[]>(`/Loan/member/${memberId}`),

  create: (loan: LoanCreate) =>
    apiClient<number>("/Loan", {
      method: "POST",
      body: JSON.stringify(loan),
    }),

  update: (id: number, loan: LoanUpdate) =>
    apiClient<{ message: string }>(`/Loan/${id}`, {
      method: "PUT",
      body: JSON.stringify(loan),
    }),
};
