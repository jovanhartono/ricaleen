"use server";

import { db } from "@/db";
import { articlesTable } from "@/db/schema";
import { articleSchema } from "@/lib/schema/article";
import { del } from "@vercel/blob";
import { eq } from "drizzle-orm";

export type ArticleDTO = Awaited<ReturnType<typeof getArticles>>[number];
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

export const updateArticle = async (id: number, args: unknown) => {
  try {
    const article = await articleSchema.parseAsync(args);
    await db.update(articlesTable).set(article).where(eq(articlesTable.id, id));
  } catch (error) {
    throw error;
  }
};

export const deleteThumbnail = async (url: string) => {
  try {
    await del(url);
  } catch {
    throw new Error("Failed to delete thumbnail!");
  }
};
