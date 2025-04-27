import {
  pgTable,
  integer,
  varchar,
  index,
  text,
  timestamp,
  foreignKey,
  unique,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const language = pgEnum("language", ["EN", "ID"]);

export const users = pgTable("users", {
  id: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity({
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

export const articles = pgTable(
  "articles",
  {
    id: integer()
      .primaryKey()
      .generatedAlwaysAsIdentity({
        name: "articles_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 2147483647,
        cache: 1,
      }),
    titleId: varchar("title_id", { length: 255 }).notNull(),
    titleEn: varchar("title_en", { length: 255 }).notNull(),
    contentId: text("content_id").notNull(),
    contentEn: text("content_en").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    thumbnail: varchar({ length: 255 }),
  },
  (table) => [
    index("article_idx").using(
      "btree",
      table.id.asc().nullsLast().op("int4_ops"),
    ),
  ],
);

export const products = pgTable(
  "products",
  {
    id: integer()
      .primaryKey()
      .generatedAlwaysAsIdentity({
        name: "products_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 2147483647,
        cache: 1,
      }),
    categoryId: integer("category_id").notNull(),
    titleId: text("title_id").notNull(),
    titleEn: text("title_en").notNull(),
    contentId: text("content_id").notNull(),
    contentEn: text("content_en").notNull(),
  },
  (table) => [
    index("product_id_idx").using(
      "btree",
      table.id.asc().nullsLast().op("int4_ops"),
    ),
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
      name: "products_category_id_categories_id_fk",
    }),
  ],
);

export const productThumbnails = pgTable(
  "product_thumbnails",
  {
    id: integer()
      .primaryKey()
      .generatedAlwaysAsIdentity({
        name: "product_thumbnails_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 2147483647,
        cache: 1,
      }),
    productId: integer("product_id").notNull(),
    url: varchar({ length: 255 }).notNull(),
  },
  (table) => [
    index("product_thumbnail_idx").using(
      "btree",
      table.id.asc().nullsLast().op("int4_ops"),
      table.productId.asc().nullsLast().op("int4_ops"),
    ),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "product_thumbnails_product_id_products_id_fk",
    }).onDelete("cascade"),
  ],
);

export const categories = pgTable(
  "categories",
  {
    id: integer()
      .primaryKey()
      .generatedAlwaysAsIdentity({
        name: "categories_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 2147483647,
        cache: 1,
      }),
    nameEn: text("name_en").notNull(),
    slug: text().notNull(),
    description: text(),
    thumbnail: varchar({ length: 255 }),
    parentId: integer("parent_id"),
    nameId: text("name_id").default(""),
  },
  (table) => [
    index("category_id_idx").using(
      "btree",
      table.id.asc().nullsLast().op("int4_ops"),
    ),
    unique("categories_slug_unique").on(table.slug),
  ],
);
