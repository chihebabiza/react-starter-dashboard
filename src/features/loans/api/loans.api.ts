import { apiClient } from "@/lib/api-client";
import type {
  Loan,
  LoanCreate,
  LoanUpdate,
} from "@/features/loans/types/loan.types";

export const loansApi = {
  create: (loan: LoanCreate) =>
    apiClient<Loan>("/Loan", {
      method: "POST",
      body: JSON.stringify(loan),
    }),

  update: (id: number, loan: LoanUpdate) =>
    apiClient<Loan>(`/Loan/${id}`, {
      method: "PUT",
      body: JSON.stringify(loan),
    }),
};
