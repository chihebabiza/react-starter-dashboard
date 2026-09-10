import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BookForm } from "../components/CategoryForm";
import { useCategories } from "../hooks/useCategories";
import { columns } from "../components/columns";

export function Categories() {
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
          <h1 className="text-2xl font-bold tracking-tight">Authors</h1>

          <p className="text-muted-foreground">
            Manage and organize your library authors.
          </p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Add Author</Button>
          </SheetTrigger>

          <SheetContent className="sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Add Author</SheetTitle>
              <SheetDescription>
                Add a new author to your library.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6">
              <BookForm />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <DataTable columns={columns} data={categories ?? []} />
    </div>
  );
}
