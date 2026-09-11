import { ArrowLeft } from "lucide-react";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { FormSheet } from "@/components/common/FormSheet";
import { useMember } from "@/features/members/hooks/useMembers";
import { getColumns } from "@/features/loans/components/columns";
import { ReturnLoanForm } from "@/features/loans/components/ReturnLoanForm";
import { useLoansByMember } from "@/features/loans/hooks/useLoans";
import type { Loan } from "@/features/loans/types/loan.types";

export function MemberLoans() {
  const navigate = useNavigate();
  const { memberId } = useParams();
  const parsedMemberId = Number(memberId);
  const memberQuery = useMember(parsedMemberId);
  const loansQuery = useLoansByMember(parsedMemberId);
  const [returnLoan, setReturnLoan] = React.useState<Loan | null>(null);

  if (!Number.isInteger(parsedMemberId) || parsedMemberId <= 0) {
    return <p className="text-destructive">Invalid member.</p>;
  }

  if (memberQuery.isLoading || loansQuery.isLoading) {
    return <div>Loading member loans...</div>;
  }

  if (memberQuery.isError || loansQuery.isError) {
    const error = memberQuery.error ?? loansQuery.error;

    return (
      <div>
        <h1 className="text-2xl font-bold">Member Loans</h1>
        <p className="text-destructive">
          {error instanceof Error
            ? error.message
            : "Failed to load member loans."}
        </p>
      </div>
    );
  }

  const member = memberQuery.data;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          title="Back to members"
          onClick={() => navigate("/members")}
        >
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Member Loans</h1>
          <p className="text-muted-foreground">
            {member && `${member.firstName} ${member.lastName}`}
          </p>
        </div>
      </div>

      <DataTable
        columns={getColumns(
          setReturnLoan,
          (loansQuery.data ?? []).some((loan) => !loan.returnedDate),
        )}
        data={loansQuery.data ?? []}
        exportFileName={`loans`}
      />
      {returnLoan && (
        <FormSheet
          open={Boolean(returnLoan)}
          onOpenChange={(open) => !open && setReturnLoan(null)}
        >
          <ReturnLoanForm
            loan={returnLoan}
            onSuccess={() => setReturnLoan(null)}
          />
        </FormSheet>
      )}
    </div>
  );
}
