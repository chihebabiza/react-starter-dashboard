"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormField } from "@/components/common/FormField";
import { FormSubmitButton } from "@/components/common/FormSubmitButton";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useUpdateUser } from "@/features/users/hooks/useUsers";
import type { User, UserUpdate } from "@/features/users/types/user.types";
import { userSchema, type EditUserFormData } from "../schemas/user.schema";

type EditUserFormProps = { user: User; onSuccess: () => void };

export function EditUserForm({ user, onSuccess }: EditUserFormProps) {
  const updateUserMutation = useUpdateUser();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<EditUserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role,
      isActive: user.isActive,
    },
  });

  async function onSubmit(data: EditUserFormData) {
    try {
      const userData: UserUpdate = {
        ...data,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        passwordHash: data.passwordHash.trim(),
      };
      await updateUserMutation.mutateAsync({ id: user.id, user: userData });
      toast.success("User updated successfully");
      onSuccess();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update user",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid flex-1 auto-rows-min gap-6 px-4">
        <div>
          <h2 className="text-xl font-semibold">Edit User</h2>
          <p className="text-sm text-muted-foreground">
            Update the user information.
          </p>
        </div>
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
        <FormField label="Active">
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <Switch
                id="user-active"
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={updateUserMutation.isPending}
                aria-label="User is active"
              />
            )}
          />
        </FormField>
      </div>
      <FormSubmitButton
        isPending={updateUserMutation.isPending}
        disabled={updateUserMutation.isPending || !isDirty}
        pendingText="Updating..."
      >
        Update User
      </FormSubmitButton>
    </form>
  );
}
