import { z } from "zod";

export const memberSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name must be less than 100 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name must be less than 100 characters"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .max(30, "Phone must be less than 30 characters"),
  isActive: z.boolean(),
});

export const createMemberSchema = memberSchema.pick({
  firstName: true,
  lastName: true,
  phone: true,
});

export type CreateMemberFormData = z.infer<typeof createMemberSchema>;
export type EditMemberFormData = z.infer<typeof memberSchema>;
