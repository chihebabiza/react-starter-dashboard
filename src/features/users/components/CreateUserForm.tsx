"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormField } from "@/components/common/FormField";
import { FormSubmitButton } from "@/components/common/FormSubmitButton";
import { Input } from "@/components/ui/input";
import { useCreateUser } from "@/features/users/hooks/useUsers";
import {
  userRoles,
  type UserCreate,
  type UserRoleValue,
} from "@/features/users/types/user.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    setValue,
    watch,
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
  const roleValue = watch("role");

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
          label="Password"
          required
          error={errors.passwordHash?.message}
        >
          <Input id="user-password-hash" {...register("passwordHash")} />
        </FormField>
        <FormField label="Role" required error={errors.role?.message}>
          <Select
            value={String(roleValue)}
            onValueChange={(value) =>
              setValue("role", Number(value) as UserRoleValue, {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger id="user-role" className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {userRoles.map((role) => (
                <SelectItem key={role.value} value={String(role.value)}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
