import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { columns } from "@/features/books/components/columns";
import { useBooks } from "@/features/books/hooks/useBooks";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useAuthors } from "@/features/authors/hooks/useAuthors";
import { CreateBookForm } from "../components/CreateBookForm";

export function Books() {
  const { data: books, isLoading, isError, error } = useBooks();
  const { data: authors } = useAuthors();
  const { data: categories } = useCategories();

  if (isLoading) {
    return <div>Loading books...</div>;
  }

  if (isError) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Books</h1>
        <p className="text-destructive">
          {error instanceof Error ? error.message : "Failed to load books."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Books</h1>

          <p className="text-muted-foreground">
            Manage and organize your library books.
          </p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Add Book</Button>
          </SheetTrigger>

          <SheetContent className="sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Add Book</SheetTitle>
              <SheetDescription>
                Add a new book to your library.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6">
              <CreateBookForm
                authors={authors ?? []}
                categories={categories ?? []}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <DataTable columns={columns} data={books ?? []} />
    </div>
  );
}
