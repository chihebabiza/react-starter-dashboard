import type { ColumnDef } from "@tanstack/react-table";

import type { Book } from "@/features/books/types/book.types";
import { DataTableColumnHeader } from "@/components/data-table/DataTableColumnHeader";

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },

  {
    accessorKey: "isbn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ISBN" />
    ),
  },

  {
    accessorKey: "authorName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
  },

  {
    accessorKey: "categoryName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },

  {
    accessorKey: "publishedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Published" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("publishedDate") as string | null;

      if (!value) {
        return "-";
      }

      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(new Date(value));
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("createdAt") as string;

      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(new Date(value));
    },
  },
];
