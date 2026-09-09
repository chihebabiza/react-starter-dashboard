import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableExport } from "./DataTableExport";
import { DataTableViewOptions } from "./DataTableViewOptions";

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  data: TData[];
  exportFileName?: string;
};

export function DataTableToolbar<TData>({
  table,
  data,
  exportFileName = "export",
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    table.getState().globalFilter !== "";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Search..."
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-9 max-w-sm"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              table.resetColumnFilters();
              table.setGlobalFilter("");
            }}
            className="h-9 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 size-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <DataTableExport table={table} data={data} fileName={exportFileName} />

        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
