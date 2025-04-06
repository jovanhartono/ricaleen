import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50),
  description: z.string().max(500).optional(),
  thumbnail: z.string().nullish(),
});

export type CategoryForm = z.infer<typeof categorySchema>;
