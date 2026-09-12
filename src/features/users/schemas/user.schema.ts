import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Enter a valid email address"),
  passwordHash: z.string().min(1, "Password hash is required"),
  role: z.number().int().min(0, "Role is required"),
  isActive: z.boolean(),
});

export const createUserSchema = userSchema.omit({ isActive: true });

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type EditUserFormData = z.infer<typeof userSchema>;
