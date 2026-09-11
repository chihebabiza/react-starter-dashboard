import { useEffect, useRef, useState } from "react";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTableToolbar } from "./DataTableToolbar";
import { DataTablePagination } from "./DataTablePagination";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  searchPlaceholder?: string;
  exportFileName?: string;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  exportFileName = "export",
}: DataTableProps<TData, TValue>) {
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const topScrollRef = useRef<HTMLDivElement>(null);
  const [tableWidth, setTableWidth] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = useState({});

  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },

    onSortingChange: setSorting,

    onColumnFiltersChange: setColumnFilters,

    onColumnVisibilityChange: setColumnVisibility,

    onRowSelectionChange: setRowSelection,

    onGlobalFilterChange: setGlobalFilter,

    globalFilterFn: "includesString",

    getCoreRowModel: getCoreRowModel(),

    getFilteredRowModel: getFilteredRowModel(),

    getSortedRowModel: getSortedRowModel(),

    getPaginationRowModel: getPaginationRowModel(),

    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  useEffect(() => {
    const tableWrapper = tableWrapperRef.current;
    const topScroll = topScrollRef.current;
    const tableScroll = tableWrapper?.querySelector<HTMLElement>(
      '[data-slot="table-container"]',
    );

    if (!tableScroll || !topScroll) {
      return;
    }

    const updateWidth = () => setTableWidth(tableScroll.scrollWidth);
    const syncFromTop = () => {
      tableScroll.scrollLeft = topScroll.scrollLeft;
    };
    const syncFromTable = () => {
      topScroll.scrollLeft = tableScroll.scrollLeft;
    };

    updateWidth();
    topScroll.addEventListener("scroll", syncFromTop);
    tableScroll.addEventListener("scroll", syncFromTable);

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(tableScroll);

    return () => {
      topScroll.removeEventListener("scroll", syncFromTop);
      tableScroll.removeEventListener("scroll", syncFromTable);
      resizeObserver.disconnect();
    };
  }, [columns, data, table.getState().columnVisibility]);

  return (
    <div className="w-full space-y-4">
      {/* Toolbar */}
      <DataTableToolbar
        table={table}
        data={data}
        exportFileName={exportFileName}
      />

      {/* Table */}
      <div ref={tableWrapperRef} className="rounded-md border">
        <div ref={topScrollRef} className="w-full overflow-x-auto">
          <div style={{ width: tableWidth, height: 1 }} />
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getVisibleLeafColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <DataTablePagination table={table} />
    </div>
  );
}
