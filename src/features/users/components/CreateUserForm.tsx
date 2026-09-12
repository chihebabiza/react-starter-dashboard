"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormField } from "@/components/common/FormField";
import { FormSubmitButton } from "@/components/common/FormSubmitButton";
import { Input } from "@/components/ui/input";
import { useCreateUser } from "@/features/users/hooks/useUsers";
import type { UserCreate } from "@/features/users/types/user.types";
import {
  createUserSchema,
  type CreateUserFormData,
} from "../schemas/user.schema";

type CreateUserFormProps = { onSuccess: () => void };

export function CreateUserForm({ onSuccess }: CreateUserFormProps) {
  const createUserMutation = useCreateUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      passwordHash: "",
      role: 0,
    },
  });

  async function onSubmit(data: CreateUserFormData) {
    try {
      const user: UserCreate = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        passwordHash: data.passwordHash.trim(),
        role: data.role,
      };
      await createUserMutation.mutateAsync(user);
      toast.success("User added successfully");
      reset();
      onSuccess();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add user",
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
          <Input id="user-first-name" {...register("firstName")} />
        </FormField>
        <FormField label="Last Name" required error={errors.lastName?.message}>
          <Input id="user-last-name" {...register("lastName")} />
        </FormField>
        <FormField label="Email" required error={errors.email?.message}>
          <Input id="user-email" type="email" {...register("email")} />
        </FormField>
        <FormField
          label="Password Hash"
          required
          error={errors.passwordHash?.message}
        >
          <Input id="user-password-hash" {...register("passwordHash")} />
        </FormField>
        <FormField label="Role" required error={errors.role?.message}>
          <Input
            id="user-role"
            type="number"
            min={0}
            {...register("role", { valueAsNumber: true })}
          />
        </FormField>
      </div>
      <FormSubmitButton
        isPending={createUserMutation.isPending}
        pendingText="Adding..."
      >
        Add User
      </FormSubmitButton>
    </form>
  );
}
