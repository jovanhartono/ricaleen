import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
};

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
});

export const articlesTable = pgTable(
  "articles",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    thumbnail: varchar({ length: 255 }),
    titleId: varchar("title_id", { length: 255 }).notNull(),
    titleEn: varchar("title_en", { length: 255 }).notNull(),
    contentId: text("content_id").notNull(),
    contentEn: text("content_en").notNull(),
    ...timestamps,
  },
  (table) => [index("article_idx").on(table.id)],
);

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({
    name: "users_id_seq",
    startWith: 1,
    increment: 1,
    minValue: 1,
    maxValue: 2147483647,
    cache: 1,
  }),
  username: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
});

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  categoryId: integer("category_id").references(() => categoriesTable.id),
  titleId: varchar("title_id", { length: 255 }),
  titleEn: varchar("title_en", { length: 255 }),
  contentId: varchar("content_id", { length: 255 }).notNull(),
  contentEn: varchar("content_en", { length: 255 }).notNull(),
});

export const productThumbnailsTable = pgTable(
  "product_thumbnails",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    productId: integer("product_id")
      .references(() => productsTable.id)
      .notNull(),
    url: varchar({ length: 255 }).notNull(),
  },
  (table) => [index("product_thumbnail_idx").on(table.id, table.productId)],
);

export const prodcutThumbnailsRelations = relations(
  productThumbnailsTable,
  ({ one }) => ({
    product: one(productsTable, {
      fields: [productThumbnailsTable.productId],
      references: [productsTable.id],
    }),
  }),
);

export const categoriesTable = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  thumbnail: varchar({ length: 255 }),
  // Self-reference to parent category (can be null for top-level categories)
  parentId: integer("parent_id"),
});

// Define the relations
export const categoriesRelations = relations(
  categoriesTable,
  ({ one, many }) => ({
    // Relation to parent category
    parent: one(categoriesTable, {
      fields: [categoriesTable.parentId],
      references: [categoriesTable.id],
      relationName: "category_parent",
    }),
    // Relation to child categories
    children: many(categoriesTable, {
      relationName: "category_parent",
    }),

    products: many(productsTable),
  }),
);

export const productsRelations = relations(productsTable, ({ one, many }) => ({
  category: one(categoriesTable, {
    fields: [productsTable.categoryId],
    references: [categoriesTable.id],
  }),
  thumbnails: many(productThumbnailsTable),
}));
