import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Enter a valid email address"),
  role: z.number().int().min(0).max(2, "Select a valid role"),
  isActive: z.boolean(),
});

export const createUserSchema = userSchema
  .extend({
    passwordHash: z.string().min(1, "Password hash is required"),
  })
  .omit({ isActive: true });

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type EditUserFormData = z.infer<typeof userSchema>;
