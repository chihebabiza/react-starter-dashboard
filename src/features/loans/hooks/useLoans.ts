import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { loansApi } from "@/features/loans/api/loans.api";
import type { LoanCreate, LoanUpdate } from "@/features/loans/types/loan.types";

const LOANS_QUERY_KEY = ["loans"];

export function useLoansByMember(memberId: number) {
  return useQuery({
    queryKey: [...LOANS_QUERY_KEY, "member", memberId],
    queryFn: () => loansApi.getByMemberId(memberId),
    enabled: memberId > 0,
  });
}

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

export function useUpdateLoan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, loan }: { id: number; loan: LoanUpdate }) =>
      loansApi.update(id, loan),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LOANS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["book-copies"] });
    },
  });
}
