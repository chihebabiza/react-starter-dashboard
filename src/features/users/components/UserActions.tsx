"use client";

import * as React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { ActionButtons } from "@/components/common/ActionButtons";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { FormSheet } from "@/components/common/FormSheet";
import { useDeleteUser } from "@/features/users/hooks/useUsers";
import type { User } from "@/features/users/types/user.types";
import { EditUserForm } from "./EditUserForm";

export function UserActions({ user }: { user: User }) {
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const deleteUserMutation = useDeleteUser();

  async function handleDelete() {
    try {
      await deleteUserMutation.mutateAsync(user.id);
      toast.success("User deleted successfully");
      setDeleteOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete user",
      );
    }
  }

  return (
    <>
      <ActionButtons
        actions={[
          {
            label: "Edit user",
            icon: <Pencil className="h-4 w-4" />,
            onClick: () => setEditOpen(true),
            className: "text-blue-600 hover:bg-blue-50 hover:text-blue-700",
          },
          {
            label: "Delete user",
            icon: <Trash2 className="h-4 w-4" />,
            onClick: () => setDeleteOpen(true),
            destructive: true,
            className: "text-red-600 hover:bg-red-50 hover:text-red-700",
          },
        ]}
      />
      <FormSheet open={editOpen} onOpenChange={setEditOpen}>
        <EditUserForm user={user} onSuccess={() => setEditOpen(false)} />
      </FormSheet>
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        isPending={deleteUserMutation.isPending}
        onConfirm={handleDelete}
      />
    </>
  );
}
