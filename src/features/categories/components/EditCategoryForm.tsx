"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormField } from "@/components/common/FormField";
import { FormSubmitButton } from "@/components/common/FormSubmitButton";
import { Input } from "@/components/ui/input";
import { useUpdateCategory } from "@/features/categories/hooks/useCategories";
import type {
  Category,
  CategoryUpdate,
} from "@/features/categories/types/category.types";
import {
  categorySchema,
  type CategoryFormData,
} from "../schemas/category.schema";

type EditCategoryFormProps = {
  category: Category;
  onSuccess: () => void;
};

export function EditCategoryForm({
  category,
  onSuccess,
}: EditCategoryFormProps) {
  const updateCategoryMutation = useUpdateCategory();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: category.name },
  });

  async function onSubmit(data: CategoryFormData) {
    try {
      const categoryData: CategoryUpdate = { name: data.name.trim() };
      await updateCategoryMutation.mutateAsync({
        id: category.id,
        category: categoryData,
      });
      toast.success("Category updated successfully");
      onSuccess();
    } catch (error) {
      console.error("Failed to update category:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update category",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid flex-1 auto-rows-min gap-6 px-4">
        <div>
          <h2 className="text-xl font-semibold">Edit Category</h2>
          <p className="text-sm text-muted-foreground">
            Update the category information.
          </p>
        </div>
        <FormField label="Name" required error={errors.name?.message}>
          <Input
            id="category-name"
            placeholder="Enter category name..."
            {...register("name")}
          />
        </FormField>
      </div>
      <FormSubmitButton
        isPending={updateCategoryMutation.isPending}
        disabled={updateCategoryMutation.isPending || !isDirty}
        pendingText="Updating..."
      >
        Update Category
      </FormSubmitButton>
    </form>
  );
}
