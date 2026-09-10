import { useState } from "react";

import { FormSheet } from "@/components/common/FormSheet";
import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { CreateCategoryForm } from "@/features/categories/components/CreateCategoryForm";
import { useCategories } from "../hooks/useCategories";
import { columns } from "../components/columns";

export function Categories() {
  const [addOpen, setAddOpen] = useState(false);
  const { data: categories, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (isError) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Categories</h1>
        <p className="text-destructive">
          {error instanceof Error
            ? error.message
            : "Failed to load categories."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Categories</h1>

          <p className="text-muted-foreground">
            Manage and organize your library categories.
          </p>
        </div>
        <Button onClick={() => setAddOpen(true)}>Add Category</Button>
      </div>

      <FormSheet open={addOpen} onOpenChange={setAddOpen}>
        <CreateCategoryForm onSuccess={() => setAddOpen(false)} />
      </FormSheet>

      <DataTable columns={columns} data={categories ?? []} />
    </div>
  );
}
