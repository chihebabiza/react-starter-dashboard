import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "@/features/books/components/columns";
import { useBooks } from "@/features/books/hooks/useBooks";

export function Books() {
  const { data: books, isLoading, isError, error } = useBooks();

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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Books</h1>

        <p className="text-muted-foreground">
          Manage and organize your library books.
        </p>
      </div>

      <DataTable columns={columns} data={books ?? []} />
    </div>
  );
}
