"use server";

import { db } from "@/db";
import { articlesTable, articleTranslationsTable } from "@/db/schema";
import { articleSchema } from "@/lib/schema/article";

// TODO: add auth checker
export const getArticles = async () => {
  return await db.select().from(articleTranslationsTable);
};

export const uploadArticle = async (args: unknown) => {
  try {
    const article = await articleSchema.parseAsync(args);
    const [newArticle] = await db.insert(articlesTable).values({}).returning();

    if (!newArticle) {
      throw new Error("Failed to create Article..");
    }

    await db.insert(articleTranslationsTable).values({
      ...article,
      articleId: newArticle.id,
    });

    // revalidatePath("")
  } catch (error) {
    throw error;
  }
};
