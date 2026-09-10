"use client";

import * as React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { ActionButtons } from "@/components/common/ActionButtons";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { FormSheet } from "@/components/common/FormSheet";
import { useDeleteAuthor } from "@/features/authors/hooks/useAuthors";
import type { Author } from "@/features/authors/types/author.types";
import { EditAuthorForm } from "./EditAuthorForm";

type AuthorActionsProps = {
  author: Author;
};

export function AuthorActions({ author }: AuthorActionsProps) {
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const deleteAuthorMutation = useDeleteAuthor();

  async function handleDelete() {
    try {
      await deleteAuthorMutation.mutateAsync(author.id);
      toast.success("Author deleted successfully");
      setDeleteOpen(false);
    } catch (error) {
      console.error("Failed to delete author:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete author",
      );
    }
  }

  return (
    <>
      <ActionButtons
        actions={[
          {
            label: "Edit author",
            icon: <Pencil className="h-4 w-4" />,
            onClick: () => setEditOpen(true),
            className: "text-blue-600 hover:bg-blue-50 hover:text-blue-700",
          },
          {
            label: "Delete author",
            icon: <Trash2 className="h-4 w-4" />,
            onClick: () => setDeleteOpen(true),
            destructive: true,
            className: "text-red-600 hover:bg-red-50 hover:text-red-700",
          },
        ]}
      />
      <FormSheet open={editOpen} onOpenChange={setEditOpen}>
        <EditAuthorForm author={author} onSuccess={() => setEditOpen(false)} />
      </FormSheet>
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        isPending={deleteAuthorMutation.isPending}
        onConfirm={handleDelete}
      />
    </>
  );
}
