import { useEffect, useRef, useState } from "react";
import type { Table } from "@tanstack/react-table";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

type DataTableExportProps<TData> = {
  table: Table<TData>;
  data: TData[];
  fileName?: string;
};

export function DataTableExport<TData>({
  table,
  fileName = "export",
}: DataTableExportProps<TData>) {
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

  const getExportData = () => {
    return table.getFilteredRowModel().rows.map((row) => {
      const result: Record<string, unknown> = {};

      row.getVisibleCells().forEach((cell) => {
        result[cell.column.id] = cell.getValue();
      });

      return result;
    });
  };

  const downloadFile = (content: string | Blob, filename: string) => {
    const blob =
      content instanceof Blob
        ? content
        : new Blob([content], {
            type: "text/plain;charset=utf-8",
          });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const exportData = getExportData();
    const csv = Papa.unparse(exportData);

    downloadFile(
      new Blob([csv], {
        type: "text/csv;charset=utf-8",
      }),
      `${fileName}.csv`,
    );

    setOpen(false);
  };

  const exportJSON = () => {
    const exportData = getExportData();
    const json = JSON.stringify(exportData, null, 2);

    downloadFile(
      new Blob([json], {
        type: "application/json;charset=utf-8",
      }),
      `${fileName}.json`,
    );

    setOpen(false);
  };

  const exportExcel = () => {
    const exportData = getExportData();

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    XLSX.writeFile(workbook, `${fileName}.xlsx`);

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
        <Download className="mr-2 size-4" />
        Export
      </Button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-40 rounded-md border bg-popover p-1 shadow-md">
          <button
            type="button"
            onClick={exportCSV}
            className="flex w-full rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
          >
            Export CSV
          </button>

          <button
            type="button"
            onClick={exportExcel}
            className="flex w-full rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
          >
            Export Excel
          </button>

          <button
            type="button"
            onClick={exportJSON}
            className="flex w-full rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
          >
            Export JSON
          </button>
        </div>
      )}
    </div>
  );
}
