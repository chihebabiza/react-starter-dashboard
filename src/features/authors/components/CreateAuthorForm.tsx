"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormField } from "@/components/common/FormField";
import { FormSubmitButton } from "@/components/common/FormSubmitButton";
import { Input } from "@/components/ui/input";
import { useCreateAuthor } from "@/features/authors/hooks/useAuthors";
import type { AuthorCreate } from "@/features/authors/types/author.types";
import { useCountries } from "@/features/countries/hooks/useCountries";
import { authorSchema, type AuthorFormData } from "../schemas/author.schema";

type CreateAuthorFormProps = {
  onSuccess: () => void;
};

export function CreateAuthorForm({ onSuccess }: CreateAuthorFormProps) {
  const createAuthorMutation = useCreateAuthor();
  const { data: countries = [], isLoading: countriesLoading } = useCountries();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
    defaultValues: { firstName: "", lastName: "", countryId: 0 },
  });

  async function onSubmit(data: AuthorFormData) {
    try {
      const author: AuthorCreate = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        countryId: data.countryId,
      };

      await createAuthorMutation.mutateAsync(author);
      toast.success("Author added successfully");
      reset();
      onSuccess();
    } catch (error) {
      console.error("Failed to add author:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add author",
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
            id="author-first-name"
            placeholder="Enter first name..."
            {...register("firstName")}
          />
        </FormField>
        <FormField label="Last Name" required error={errors.lastName?.message}>
          <Input
            id="author-last-name"
            placeholder="Enter last name..."
            {...register("lastName")}
          />
        </FormField>
        <FormField label="Country" required error={errors.countryId?.message}>
          <select
            id="author-country-id"
            disabled={countriesLoading}
            {...register("countryId", { valueAsNumber: true })}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value={0}>Select a country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>
        </FormField>
      </div>
      <FormSubmitButton
        isPending={createAuthorMutation.isPending}
        pendingText="Adding..."
      >
        Add Author
      </FormSubmitButton>
    </form>
  );
}
