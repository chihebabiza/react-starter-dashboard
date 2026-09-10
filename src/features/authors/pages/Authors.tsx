import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { FormSheet } from "@/components/common/FormSheet";
import { CreateAuthorForm } from "@/features/authors/components/CreateAuthorForm";
import { useState } from "react";
import { useAuthors } from "../hooks/useAuthors";
import { columns } from "../components/columns";

export function Authors() {
  const [addOpen, setAddOpen] = useState(false);
  const { data: authors, isLoading, isError, error } = useAuthors();

  if (isLoading) {
    return <div>Loading authors...</div>;
  }

  if (isError) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Authors</h1>
        <p className="text-destructive">
          {error instanceof Error ? error.message : "Failed to load authors."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Authors</h1>

          <p className="text-muted-foreground">
            Manage and organize your library authors.
          </p>
        </div>
        <Button onClick={() => setAddOpen(true)}>Add Author</Button>
      </div>

      <FormSheet open={addOpen} onOpenChange={setAddOpen}>
        <CreateAuthorForm onSuccess={() => setAddOpen(false)} />
      </FormSheet>

      <DataTable columns={columns} data={authors ?? []} />
    </div>
  );
}
