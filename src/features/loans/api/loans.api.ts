import { apiClient } from "@/lib/api-client";
import type {
  LoanCreate,
  LoanCreateResponse,
  LoanUpdate,
} from "@/features/loans/types/loan.types";

export const loansApi = {
  create: (loan: LoanCreate) =>
    apiClient<LoanCreateResponse>("/Loan", {
      method: "POST",
      body: JSON.stringify(loan),
    }),

  update: (id: number, loan: LoanUpdate) =>
    apiClient<{ message: string }>(`/Loan/${id}`, {
      method: "PUT",
      body: JSON.stringify(loan),
    }),
};
