import { z } from "zod";

const bookFormSchema = z.object({
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

export const createBookSchema = bookFormSchema.extend({
  quantity: z.number().int().positive("Quantity must be greater than 0"),
});
export const editBookSchema = bookFormSchema;

export type CreateBookFormData = z.infer<typeof createBookSchema>;
export type EditBookFormData = z.infer<typeof editBookSchema>;
