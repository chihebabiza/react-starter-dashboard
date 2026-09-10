import { useState } from "react";

import { FormSheet } from "@/components/common/FormSheet";
import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { CreateMemberForm } from "@/features/members/components/CreateMemberForm";
import { useMembers } from "../hooks/useMembers";
import { columns } from "../components/columns";

export function Members() {
  const [addOpen, setAddOpen] = useState(false);
  const { data: members, isLoading, isError, error } = useMembers();

  if (isLoading) {
    return <div>Loading members...</div>;
  }

  if (isError) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Members</h1>
        <p className="text-destructive">
          {error instanceof Error ? error.message : "Failed to load members."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Members</h1>

          <p className="text-muted-foreground">
            Manage and organize your library members.
          </p>
        </div>
        <Button onClick={() => setAddOpen(true)}>Add Member</Button>
      </div>

      <FormSheet open={addOpen} onOpenChange={setAddOpen}>
        <CreateMemberForm onSuccess={() => setAddOpen(false)} />
      </FormSheet>

      <DataTable columns={columns} data={members ?? []} />
    </div>
  );
}
