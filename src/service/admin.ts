"use server";

import { db } from "@/db";
import { articlesTable, categoriesTable } from "@/db/schema";
import { articleSchema } from "@/lib/schema/article";
import { categorySchema } from "@/lib/schema/category";
import { toSlug } from "@/lib/utils/helper";
import { del } from "@vercel/blob";
import { eq } from "drizzle-orm";

export const getArticles = async () => {
  return await db.select().from(articlesTable);
};
export type ArticleDTO = Awaited<ReturnType<typeof getArticles>>[number];

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

export const getCategories = async () =>
  await db.select().from(categoriesTable);
export type CategoryDTO = Awaited<ReturnType<typeof getCategories>>[number];

export const createCategory = async (args: unknown) => {
  try {
    const category = await categorySchema.parseAsync(args);
    await db.insert(categoriesTable).values({
      ...category,
      slug: toSlug(category.name),
    });
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (id: number, args: unknown) => {
  try {
    const category = await categorySchema.parseAsync(args);
    await db
      .update(categoriesTable)
      .set(category)
      .where(eq(categoriesTable.id, id));
  } catch (error) {
    throw error;
  }
};
