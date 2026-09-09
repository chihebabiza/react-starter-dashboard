import type { Table } from "@tanstack/react-table";
import { RotateCcw, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type DataTableViewOptionsProps<TData> = {
  table: Table<TData>;
};

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const columns = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide(),
    );

  const resetColumns = () => {
    table.resetColumnVisibility();
  };

  return (
    <div className="relative">
      <details className="group">
        <summary className="flex h-9 cursor-pointer list-none items-center gap-2 rounded-md border bg-background px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
          <Settings2 className="size-4" />
          View
        </summary>

        <div className="absolute right-0 z-50 mt-2 w-52 rounded-md border bg-popover p-2 shadow-md">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-2 pb-2">
            <span className="text-sm font-medium">Toggle columns</span>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={resetColumns}
              className="h-7 px-2 text-xs"
            >
              <RotateCcw className="mr-1 size-3.5" />
              Reset
            </Button>
          </div>

          {/* Columns */}
          <div className="mt-2 space-y-1">
            {columns.map((column) => {
              const title =
                typeof column.columnDef.header === "string"
                  ? column.columnDef.header
                  : column.id;

              return (
                <label
                  key={column.id}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                >
                  <input
                    type="checkbox"
                    checked={column.getIsVisible()}
                    onChange={() => column.toggleVisibility()}
                    className="size-4"
                  />

                  <span>{title}</span>
                </label>
              );
            })}
          </div>

          {/* Reset button */}
          <div className="mt-2 border-t pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetColumns}
              className="w-full"
            >
              <RotateCcw className="mr-2 size-4" />
              Show all columns
            </Button>
          </div>
        </div>
      </details>
    </div>
  );
}
