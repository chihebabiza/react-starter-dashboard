"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormField } from "@/components/common/FormField";
import { FormSubmitButton } from "@/components/common/FormSubmitButton";
import { Input } from "@/components/ui/input";
import { useUpdateAuthor } from "@/features/authors/hooks/useAuthors";
import { useCountries } from "@/features/countries/hooks/useCountries";
import type {
  Author,
  AuthorUpdate,
} from "@/features/authors/types/author.types";
import { authorSchema, type AuthorFormData } from "../schemas/author.schema";

type EditAuthorFormProps = {
  author: Author;
  onSuccess: () => void;
};

export function EditAuthorForm({ author, onSuccess }: EditAuthorFormProps) {
  const updateAuthorMutation = useUpdateAuthor();
  const { data: countries = [], isLoading: countriesLoading } = useCountries();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      firstName: author.firstName,
      lastName: author.lastName,
      countryId: author.country.id,
    },
  });

  async function onSubmit(data: AuthorFormData) {
    try {
      const authorData: AuthorUpdate = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        countryId: data.countryId,
      };

      await updateAuthorMutation.mutateAsync({
        id: author.id,
        author: authorData,
      });
      toast.success("Author updated successfully");
      onSuccess();
    } catch (error) {
      console.error("Failed to update author:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update author",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid flex-1 auto-rows-min gap-6 px-4">
        <div>
          <h2 className="text-xl font-semibold">Edit Author</h2>
          <p className="text-sm text-muted-foreground">
            Update the author information.
          </p>
        </div>
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
        isPending={updateAuthorMutation.isPending}
        disabled={updateAuthorMutation.isPending || !isDirty}
        pendingText="Updating..."
      >
        Update Author
      </FormSubmitButton>
    </form>
  );
}
