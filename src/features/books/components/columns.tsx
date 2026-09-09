import type { ColumnDef } from "@tanstack/react-table";

import type { Book } from "@/features/books/types/book.types";

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
  },
  {
    accessorKey: "authorName",
    header: "Author",
  },
  {
    accessorKey: "categoryName",
    header: "Category",
  },
  {
    accessorKey: "publishedDate",
    header: "Published",
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
    header: "Created",
    cell: ({ row }) => {
      const value = row.getValue("createdAt") as string;

      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(new Date(value));
    },
  },
];
