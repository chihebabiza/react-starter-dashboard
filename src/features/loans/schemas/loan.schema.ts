import { z } from "zod";

export const createLoanSchema = z.object({
  bookId: z.number().int().positive("Please select a book"),
  bookCopyId: z.number().int().positive("Please select a copy"),
  borrowedDate: z.string().min(1, "Borrowed date is required"),
  period: z.number().int().positive("Period must be greater than 0"),
});

export type CreateLoanFormData = z.infer<typeof createLoanSchema>;
