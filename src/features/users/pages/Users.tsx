import { useState } from "react";

import { FormSheet } from "@/components/common/FormSheet";
import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { CreateUserForm } from "@/features/users/components/CreateUserForm";
import { columns } from "@/features/users/components/columns";
import { useUsers } from "@/features/users/hooks/useUsers";

export function Users() {
  const [addOpen, setAddOpen] = useState(false);
  const { data: users, isLoading, isError, error } = useUsers();

  if (isLoading) return <div>Loading users...</div>;
  if (isError)
    return (
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-destructive">
          {error instanceof Error ? error.message : "Failed to load users."}
        </p>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage system users and access.
          </p>
        </div>
        <Button onClick={() => setAddOpen(true)}>Add User</Button>
      </div>
      <FormSheet open={addOpen} onOpenChange={setAddOpen}>
        <CreateUserForm onSuccess={() => setAddOpen(false)} />
      </FormSheet>
      <DataTable columns={columns} data={users ?? []} />
    </div>
  );
}
