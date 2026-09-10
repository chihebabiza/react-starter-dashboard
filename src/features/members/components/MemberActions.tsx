"use client";

import * as React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { ActionButtons } from "@/components/common/ActionButtons";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { FormSheet } from "@/components/common/FormSheet";
import { useDeleteMember } from "@/features/members/hooks/useMembers";
import type { Member } from "@/features/members/types/member.types";
import { EditMemberForm } from "./EditMemberForm";

type MemberActionsProps = {
  member: Member;
};

export function MemberActions({ member }: MemberActionsProps) {
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const deleteMemberMutation = useDeleteMember();

  async function handleDelete() {
    try {
      await deleteMemberMutation.mutateAsync(member.id);
      toast.success("Member deleted successfully");
      setDeleteOpen(false);
    } catch (error) {
      console.error("Failed to delete member:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete member",
      );
    }
  }

  return (
    <>
      <ActionButtons
        actions={[
          {
            label: "Edit member",
            icon: <Pencil className="h-4 w-4" />,
            onClick: () => setEditOpen(true),
            className: "text-blue-600 hover:bg-blue-50 hover:text-blue-700",
          },
          {
            label: "Delete member",
            icon: <Trash2 className="h-4 w-4" />,
            onClick: () => setDeleteOpen(true),
            destructive: true,
            className: "text-red-600 hover:bg-red-50 hover:text-red-700",
          },
        ]}
      />
      <FormSheet open={editOpen} onOpenChange={setEditOpen}>
        <EditMemberForm member={member} onSuccess={() => setEditOpen(false)} />
      </FormSheet>
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        isPending={deleteMemberMutation.isPending}
        onConfirm={handleDelete}
      />
    </>
  );
}
