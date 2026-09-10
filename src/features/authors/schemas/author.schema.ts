import { z } from "zod";

export const authorSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name must be less than 100 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name must be less than 100 characters"),
  countryId: z.number().int().positive("Country ID must be greater than 0"),
});

export type AuthorFormData = z.infer<typeof authorSchema>;
