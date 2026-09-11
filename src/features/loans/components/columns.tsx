import type { ColumnDef } from "@tanstack/react-table";
import { CheckCircle } from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import type { Loan } from "@/features/loans/types/loan.types";

function formatDate(value?: string) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(value));
}

export function getColumns(onReturn: (loan: Loan) => void): ColumnDef<Loan>[] {
  return [
    {
      id: "book",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Book" />
      ),
      accessorFn: (loan) => loan.book.title,
      cell: ({ row }) => (
        <div className="font-medium">{row.original.book.title}</div>
      ),
    },
    {
      id: "copy",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Copy" />
      ),
      accessorFn: (loan) => loan.bookCopy.copyNumber,
      cell: ({ row }) => `BC-${row.original.bookCopy.copyNumber}`,
    },
    {
      accessorKey: "borrowedDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Borrowed" />
      ),
      cell: ({ row }) => formatDate(row.original.borrowedDate),
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Due" />
      ),
      cell: ({ row }) => formatDate(row.original.dueDate),
    },
    {
      accessorKey: "returnedDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Returned" />
      ),
      cell: ({ row }) => formatDate(row.original.returnedDate),
    },
    {
      id: "status",
      header: "Status",
      accessorFn: (loan) => (loan.returnedDate ? "Returned" : "Active"),
      cell: ({ row }) => (row.original.returnedDate ? "Returned" : "Active"),
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) =>
        row.original.returnedDate ? (
          <span className="text-muted-foreground">No actions</span>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Return book"
            title="Return book"
            onClick={() => onReturn(row.original)}
          >
            <CheckCircle className="size-4 text-green-600" />
          </Button>
        ),
    },
  ];
}
