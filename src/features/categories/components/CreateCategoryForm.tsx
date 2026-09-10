"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormField } from "@/components/common/FormField";
import { FormSubmitButton } from "@/components/common/FormSubmitButton";
import { Input } from "@/components/ui/input";
import { useCreateCategory } from "@/features/categories/hooks/useCategories";
import type { CategoryCreate } from "@/features/categories/types/category.types";
import {
  categorySchema,
  type CategoryFormData,
} from "../schemas/category.schema";

type CreateCategoryFormProps = {
  onSuccess: () => void;
};

export function CreateCategoryForm({ onSuccess }: CreateCategoryFormProps) {
  const createCategoryMutation = useCreateCategory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "" },
  });

  async function onSubmit(data: CategoryFormData) {
    try {
      const category: CategoryCreate = { name: data.name.trim() };
      await createCategoryMutation.mutateAsync(category);
      toast.success("Category added successfully");
      reset();
      onSuccess();
    } catch (error) {
      console.error("Failed to add category:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add category",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid flex-1 auto-rows-min gap-6 px-4">
        <FormField label="Name" required error={errors.name?.message}>
          <Input
            id="category-name"
            placeholder="Enter category name..."
            {...register("name")}
          />
        </FormField>
      </div>
      <FormSubmitButton
        isPending={createCategoryMutation.isPending}
        pendingText="Adding..."
      >
        Add Category
      </FormSubmitButton>
    </form>
  );
}
