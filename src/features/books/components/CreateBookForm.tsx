"use client";

import { Input } from "@/components/ui/input";

import { useAuthors } from "@/features/authors/hooks/useAuthors";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useCreateBook } from "@/features/books/hooks/useBooks";
import type { BookCreate } from "@/features/books/types/book.types";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { FormField } from "@/components/common/FormField";
import { FormSubmitButton } from "@/components/common/FormSubmitButton";

const createBookSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),

  isbn: z
    .string()
    .min(1, "ISBN is required")
    .max(20, "ISBN must be less than 20 characters"),

  authorId: z.number().int().positive("Please select an author"),

  categoryId: z.number().int().positive("Please select a category"),

  publishedDate: z.string().min(1, "Published date is required"),
});

type CreateBookFormData = z.infer<typeof createBookSchema>;

interface CreateBookFormProps {
  onSuccess: () => void;
}

export function CreateBookForm({ onSuccess }: CreateBookFormProps) {
  const { data: authors = [] } = useAuthors();
  const { data: categories = [] } = useCategories();

  const createBookMutation = useCreateBook();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBookFormData>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      title: "",
      isbn: "",
      authorId: 0,
      categoryId: 0,
      publishedDate: "",
    },
  });

  async function onSubmit(data: CreateBookFormData) {
    try {
      const book: BookCreate = {
        title: data.title.trim(),
        isbn: data.isbn.trim(),
        authorId: data.authorId,
        categoryId: data.categoryId,
        publishedDate: data.publishedDate,
      };

      await createBookMutation.mutateAsync(book);

      toast.success("Book added successfully");

      reset();
      onSuccess();
    } catch (error) {
      console.error("Failed to add book:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to add book",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid flex-1 auto-rows-min gap-6 px-4">
        {/* Title */}
        <FormField label="Title" required error={errors.title?.message}>
          <Input
            id="book-title"
            placeholder="Enter book title..."
            {...register("title")}
          />
        </FormField>

        {/* ISBN */}
        <FormField label="ISBN" required error={errors.isbn?.message}>
          <Input
            id="book-isbn"
            placeholder="Enter ISBN..."
            {...register("isbn")}
          />
        </FormField>

        {/* Author */}
        <FormField label="Author" required error={errors.authorId?.message}>
          <select
            id="book-author"
            {...register("authorId", {
              valueAsNumber: true,
            })}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value={0}>Select an author</option>

            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.firstName} {author.lastName}
              </option>
            ))}
          </select>
        </FormField>

        {/* Category */}
        <FormField label="Category" required error={errors.categoryId?.message}>
          <select
            id="book-category"
            {...register("categoryId", {
              valueAsNumber: true,
            })}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value={0}>Select a category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </FormField>

        {/* Published Date */}
        <FormField
          label="Published Date"
          required
          error={errors.publishedDate?.message}
        >
          <Input
            id="book-published-date"
            type="date"
            {...register("publishedDate")}
          />
        </FormField>
      </div>

      <FormSubmitButton
        isPending={createBookMutation.isPending}
        pendingText="Adding..."
      >
        Add Book
      </FormSubmitButton>
    </form>
  );
}
