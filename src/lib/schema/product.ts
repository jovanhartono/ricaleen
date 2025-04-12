import { z } from "zod";

export const productSchema = z.object({
  thumbnails: z.array(
    z.object({
      url: z.string(),
    }),
  ),
  titleId: z.string().min(1, { message: "Title is Required!" }),
  titleEn: z.string().min(1, { message: "Title is Required!" }),
  contentId: z.string().min(1, { message: "Content is Required!" }),
  contentEn: z.string().min(1, { message: "Content is Required!" }),
  productRelationIds: z.array(z.number()).nullish(),
  categoryId: z.number(),
});
export type ProductFormValues = z.infer<typeof productSchema>;
