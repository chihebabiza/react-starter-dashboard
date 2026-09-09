import { useEffect, useRef, useState } from "react";
import type { Table } from "@tanstack/react-table";
import { RotateCcw, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type DataTableViewOptionsProps<TData> = {
  table: Table<TData>;
};

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const columns = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide(),
    );

  const resetColumns = () => {
    table.resetColumnVisibility();
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen((current) => !current)}
        className="h-9"
      >
        <Settings2 className="mr-2 size-4" />
        View
      </Button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-52 rounded-md border bg-popover p-2 shadow-md">
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
      )}
    </div>
  );
}
