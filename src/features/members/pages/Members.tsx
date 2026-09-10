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
import { BookForm } from "../components/MemberForm";
import { useMembers } from "../hooks/useMembers";
import { columns } from "../components/columns";

export function Members() {
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
        <Sheet>
          <SheetTrigger asChild>
            <Button>Add Member</Button>
          </SheetTrigger>

          <SheetContent className="sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Add Member</SheetTitle>
              <SheetDescription>
                Add a new member to your library.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6">
              <BookForm />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <DataTable columns={columns} data={members ?? []} />
    </div>
  );
}
