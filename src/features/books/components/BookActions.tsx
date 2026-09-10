"use client";

import * as React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import type { Book } from "@/features/books/types/book.types";
import { useDeleteBook } from "@/features/books/hooks/useBooks";

import { EditBookForm } from "./EditBookForm";
import { ActionButtons } from "@/components/common/ActionButtons";
import { FormSheet } from "@/components/common/FormSheet";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";

type BookActionsProps = {
  book: Book;
};

export function BookActions({ book }: BookActionsProps) {
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const deleteBookMutation = useDeleteBook();

  const handleDelete = async () => {
    try {
      await deleteBookMutation.mutateAsync(book.id);

      toast.success("Book deleted successfully");
      setDeleteOpen(false);
    } catch (error) {
      console.error("Failed to delete book:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to delete book",
      );
    }
  };

  return (
    <>
      <ActionButtons
        actions={[
          {
            label: "Edit book",
            icon: <Pencil className="h-4 w-4" />,
            onClick: () => setEditOpen(true),
            className: "text-blue-600 hover:bg-blue-50 hover:text-blue-700",
          },
          {
            label: "Delete book",
            icon: <Trash2 className="h-4 w-4" />,
            onClick: () => setDeleteOpen(true),
            destructive: true,
            className: "text-red-600 hover:bg-red-50 hover:text-red-700",
          },
        ]}
      />

      <FormSheet open={editOpen} onOpenChange={setEditOpen}>
        <EditBookForm book={book} onSuccess={() => setEditOpen(false)} />
      </FormSheet>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        isPending={deleteBookMutation.isPending}
        onConfirm={handleDelete}
      />
    </>
  );
}
