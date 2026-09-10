"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormField } from "@/components/common/FormField";
import { FormSubmitButton } from "@/components/common/FormSubmitButton";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useUpdateMember } from "@/features/members/hooks/useMembers";
import type {
  Member,
  MemberUpdate,
} from "@/features/members/types/member.types";
import {
  memberSchema,
  type EditMemberFormData,
} from "../schemas/member.schema";

type EditMemberFormProps = {
  member: Member;
  onSuccess: () => void;
};

export function EditMemberForm({ member, onSuccess }: EditMemberFormProps) {
  const updateMemberMutation = useUpdateMember();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<EditMemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      firstName: member.firstName,
      lastName: member.lastName,
      phone: member.phone,
      isActive: member.isActive,
    },
  });

  async function onSubmit(data: EditMemberFormData) {
    try {
      const memberData: MemberUpdate = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        phone: data.phone.trim(),
        isActive: data.isActive,
      };
      await updateMemberMutation.mutateAsync({
        id: member.id,
        member: memberData,
      });
      toast.success("Member updated successfully");
      onSuccess();
    } catch (error) {
      console.error("Failed to update member:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update member",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid flex-1 auto-rows-min gap-6 px-4">
        <div>
          <h2 className="text-xl font-semibold">Edit Member</h2>
          <p className="text-sm text-muted-foreground">
            Update the member information.
          </p>
        </div>
        <FormField
          label="First Name"
          required
          error={errors.firstName?.message}
        >
          <Input
            id="member-first-name"
            placeholder="Enter first name..."
            {...register("firstName")}
          />
        </FormField>
        <FormField label="Last Name" required error={errors.lastName?.message}>
          <Input
            id="member-last-name"
            placeholder="Enter last name..."
            {...register("lastName")}
          />
        </FormField>
        <FormField label="Phone" required error={errors.phone?.message}>
          <Input
            id="member-phone"
            type="tel"
            placeholder="Enter phone number..."
            {...register("phone")}
          />
        </FormField>
        <FormField label="Active">
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <Switch
                id="member-active"
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={updateMemberMutation.isPending}
                aria-label="Member is active"
              />
            )}
          />
        </FormField>
      </div>
      <FormSubmitButton
        isPending={updateMemberMutation.isPending}
        disabled={updateMemberMutation.isPending || !isDirty}
        pendingText="Updating..."
      >
        Update Member
      </FormSubmitButton>
    </form>
  );
}
