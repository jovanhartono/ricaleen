import { z } from "zod";

export const categorySchema = z.object({
  name_id: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50),
  name_en: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50),
  description: z.string().max(500).optional(),
  thumbnail: z.string().min(1, { message: "Thumbnail is required!" }),
});

export type CategoryForm = z.infer<typeof categorySchema>;
