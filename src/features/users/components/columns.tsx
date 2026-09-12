import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table/DataTableColumnHeader";
import { UserActions } from "./UserActions";
import { userRoles, type User } from "../types/user.types";

export const columns: ColumnDef<User>[] = [
  ...(["firstName", "lastName", "email", "role"] as const).map((key) => ({
    accessorKey: key,
    header: ({
      column,
    }: {
      column: Parameters<NonNullable<ColumnDef<User>["header"]>>[0]["column"];
    }) => (
      <DataTableColumnHeader
        column={column}
        title={
          key === "firstName"
            ? "First Name"
            : key === "lastName"
              ? "Last Name"
              : key[0].toUpperCase() + key.slice(1)
        }
      />
    ),
    cell: ({ row }: { row: { getValue: (key: string) => unknown } }) => {
      const value = row.getValue(key);
      const displayValue =
        key === "role"
          ? (userRoles.find((role) => role.label === value)?.label ??
            String(value))
          : String(value);

      return <div className="font-medium">{displayValue}</div>;
    },
  })),
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) =>
      new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        new Date(row.getValue("createdAt") as string),
      ),
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" />
    ),
    cell: ({ row }) => (row.getValue("isActive") ? "Yes" : "No"),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <UserActions user={row.original} />,
  },
];
