"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormField } from "@/components/common/FormField";
import { FormSubmitButton } from "@/components/common/FormSubmitButton";
import { Input } from "@/components/ui/input";
import { useCreateMember } from "@/features/members/hooks/useMembers";
import type { MemberCreate } from "@/features/members/types/member.types";
import {
  createMemberSchema,
  type CreateMemberFormData,
} from "../schemas/member.schema";

type CreateMemberFormProps = {
  onSuccess: () => void;
};

export function CreateMemberForm({ onSuccess }: CreateMemberFormProps) {
  const createMemberMutation = useCreateMember();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateMemberFormData>({
    resolver: zodResolver(createMemberSchema),
    defaultValues: { firstName: "", lastName: "", phone: "" },
  });

  async function onSubmit(data: CreateMemberFormData) {
    try {
      const member: MemberCreate = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        phone: data.phone.trim(),
      };
      await createMemberMutation.mutateAsync(member);
      toast.success("Member added successfully");
      reset();
      onSuccess();
    } catch (error) {
      console.error("Failed to add member:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add member",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid flex-1 auto-rows-min gap-6 px-4">
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
      </div>
      <FormSubmitButton
        isPending={createMemberMutation.isPending}
        pendingText="Adding..."
      >
        Add Member
      </FormSubmitButton>
    </form>
  );
}
