"use server";

import { db } from "@/db";
import {
  articlesTable,
  categoriesTable,
  productsTable,
  productThumbnailsTable,
} from "@/db/schema";
import { articleSchema } from "@/lib/schema/article";
import { categorySchema } from "@/lib/schema/category";
import { productSchema } from "@/lib/schema/product";
import { toSlug } from "@/lib/utils/helper";
import { del } from "@vercel/blob";
import { eq, getTableColumns } from "drizzle-orm";

export const getArticles = async () => {
  return await db.select().from(articlesTable);
};
export type ArticleDTO = Awaited<ReturnType<typeof getArticles>>[number];

export const createArticle = async (args: unknown) => {
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
    // find the thumbnail, if different from the current one, delete the old one
    const currentArticle = await db
      .select()
      .from(articlesTable)
      .where(eq(articlesTable.id, id))
      .limit(1)
      .then((articles) => articles[0]);

    if (
      currentArticle.thumbnail &&
      currentArticle.thumbnail !== article.thumbnail
    ) {
      await deleteThumbnail(currentArticle.thumbnail);
    }

    // update the article
    await db.update(articlesTable).set(article).where(eq(articlesTable.id, id));
  } catch (error) {
    throw error;
  }
};

export const deleteArticle = async (id: number) => {
  try {
    const currentArticle = await db
      .select()
      .from(articlesTable)
      .where(eq(articlesTable.id, id))
      .limit(1)
      .then((articles) => articles[0]);

    if (currentArticle.thumbnail) {
      await deleteThumbnail(currentArticle.thumbnail);
    }

    await db.delete(articlesTable).where(eq(articlesTable.id, id));
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

export const getProducts = async () => {
  const [products, thumbnails] = await Promise.all([
    db
      .select({
        ...getTableColumns(productsTable),
        categoryName: categoriesTable.name,
      })
      .from(productsTable)
      .leftJoin(
        categoriesTable,
        eq(productsTable.categoryId, categoriesTable.id),
      ),
    db.select().from(productThumbnailsTable),
  ]);

  const productsWithThumbnails = products.map((product) => ({
    ...product,
    thumbnails: thumbnails
      .filter(({ productId }) => productId === product.id)
      .map(({ url }) => url),
  }));

  return productsWithThumbnails;
};
export type ProductDTO = Awaited<ReturnType<typeof getProducts>>[number];

export const createProduct = async (args: unknown) => {
  try {
    const { thumbnails, ...product } = await productSchema.parseAsync(args);
    const [newProduct] = await db
      .insert(productsTable)
      .values(product)
      .returning();

    await Promise.all(
      thumbnails.map(({ url }) =>
        db.insert(productThumbnailsTable).values({
          productId: newProduct.id,
          url,
        }),
      ),
    );
  } catch (error) {
    throw error;
  }
};
