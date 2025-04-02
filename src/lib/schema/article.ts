import { z } from "zod";

export const articleSchema = z.object({
  thumbnail: z.string().nullish(),
  titleId: z.string().min(1, { message: "Title is Required!" }),
  titleEn: z.string().min(1, { message: "Title is Required!" }),
  contentId: z.string().min(1, { message: "Content is Required!" }),
  contentEn: z.string().min(1, { message: "Content is Required!" }),
});
export type Article = z.infer<typeof articleSchema>;
