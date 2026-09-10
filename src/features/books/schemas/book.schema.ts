import { z } from "zod";

export const bookSchema = z.object({
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

export type BookFormValues = z.infer<typeof bookSchema>;
