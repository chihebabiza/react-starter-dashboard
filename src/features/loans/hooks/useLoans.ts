import { useMutation, useQueryClient } from "@tanstack/react-query";

import { loansApi } from "@/features/loans/api/loans.api";
import type { LoanCreate } from "@/features/loans/types/loan.types";

const LOANS_QUERY_KEY = ["loans"];

export function useCreateLoan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (loan: LoanCreate) => loansApi.create(loan),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LOANS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["book-copies"] });
    },
  });
}
