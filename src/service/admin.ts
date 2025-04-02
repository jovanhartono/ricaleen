"use server";

import { db } from "@/db";
import { articlesTable } from "@/db/schema";
import { articleSchema } from "@/lib/schema/article";

// TODO: add auth checker
export const getArticles = async () => {
  return await db.select().from(articlesTable);
};

export const uploadArticle = async (args: unknown) => {
  try {
    const article = await articleSchema.parseAsync(args);
    await db.insert(articlesTable).values(article);
  } catch (error) {
    throw error;
  }
};
