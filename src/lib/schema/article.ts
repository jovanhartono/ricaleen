import { LANGUAGE } from "@/types/enum";
import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(1, { message: "Article is Required!" }),
  language: z.nativeEnum(LANGUAGE, { required_error: "Language is Required!" }),
  content: z.string().min(1, { message: "Content is Required!" }),
});
export type Article = z.infer<typeof articleSchema>;
