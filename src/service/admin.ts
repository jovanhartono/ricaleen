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
import { and, eq, getTableColumns } from "drizzle-orm";

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
    const exitstingArticle = await db
      .select()
      .from(articlesTable)
      .where(eq(articlesTable.id, id))
      .limit(1)
      .then((articles) => articles[0]);

    if (
      exitstingArticle.thumbnail &&
      exitstingArticle.thumbnail !== article.thumbnail
    ) {
      await deleteThumbnail(exitstingArticle.thumbnail);
    }

    // update the article
    await db.update(articlesTable).set(article).where(eq(articlesTable.id, id));
  } catch (error) {
    throw error;
  }
};

export const deleteArticle = async (id: number) => {
  try {
    const existingArticle = await db
      .select({
        thumbnail: articlesTable.thumbnail,
      })
      .from(articlesTable)
      .where(eq(articlesTable.id, id))
      .limit(1)
      .then((articles) => articles[0]);

    await db.delete(articlesTable).where(eq(articlesTable.id, id));

    if (existingArticle.thumbnail) {
      deleteThumbnail(existingArticle.thumbnail);
    }
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

    const [existingCategory] = await db
      .select({
        thumbnail: categoriesTable.thumbnail,
      })
      .from(categoriesTable)
      .limit(1)
      .where(eq(categoriesTable.id, id));

    if (
      existingCategory.thumbnail &&
      category.thumbnail !== existingCategory.thumbnail
    ) {
      deleteThumbnail(existingCategory.thumbnail);
    }

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

export const updateProduct = async (id: number, args: unknown) => {
  try {
    const { thumbnails: updatedThumbnails, ...product } =
      await productSchema.parseAsync(args);

    await db.update(productsTable).set(product).where(eq(productsTable.id, id));

    const existingThumbnails = await db
      .select({
        url: productThumbnailsTable.url,
      })
      .from(productThumbnailsTable)
      .where(eq(productThumbnailsTable.productId, id))
      .then((res) => res.map(({ url }) => url));

    const removedThumbnails = existingThumbnails.filter((existingThumbnail) =>
      updatedThumbnails.every(({ url }) => url !== existingThumbnail),
    );

    await Promise.all(
      removedThumbnails.map(async (url) => {
        await db
          .delete(productThumbnailsTable)
          .where(
            and(
              eq(productThumbnailsTable.productId, id),
              eq(productThumbnailsTable.url, url),
            ),
          );

        await deleteThumbnail(url);
      }),
    );

    const newThumbnails = updatedThumbnails.filter((thumbnail) =>
      existingThumbnails.every((url) => url !== thumbnail.url),
    );

    await Promise.all(
      newThumbnails.map(({ url }) =>
        db.insert(productThumbnailsTable).values({
          productId: id,
          url,
        }),
      ),
    );
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const thumbnails = await db
      .select({
        url: productThumbnailsTable.url,
      })
      .from(productThumbnailsTable)
      .where(eq(productThumbnailsTable.productId, id));

    await db.delete(productsTable).where(eq(productsTable.id, id));

    thumbnails.forEach(({ url }) => {
      deleteThumbnail(url);
    });
  } catch (error) {
    throw error;
  }
};
