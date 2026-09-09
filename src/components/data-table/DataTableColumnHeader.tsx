import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
};

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const sorted = column.getIsSorted();

  return (
    <button
      type="button"
      onClick={column.getToggleSortingHandler()}
      className="flex items-center gap-2 font-medium hover:text-foreground"
    >
      <span>{title}</span>

      <span className="text-muted-foreground">
        {sorted === "asc" ? (
          <ArrowUp className="size-4" />
        ) : sorted === "desc" ? (
          <ArrowDown className="size-4" />
        ) : (
          <ArrowUpDown className="size-4" />
        )}
      </span>
    </button>
  );
}
