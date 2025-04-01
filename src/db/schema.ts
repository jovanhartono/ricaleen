import {
  foreignKey,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
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

export const articlesTable = pgTable("articles", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  ...timestamps,
});

export const languageEnum = pgEnum("language", ["EN", "ID"]);
export const articleTranslationsTable = pgTable(
  "article_translations",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    articleId: integer("article_id")
      .notNull()
      .references(() => articlesTable.id, {
        onDelete: "cascade",
      }),
    title: varchar({ length: 255 }).notNull(),
    language: languageEnum().notNull(),
    content: text().notNull(),
    ...timestamps,
  },
  (table) => [
    index("article_group_id_idx").on(table.articleId),
    unique().on(table.articleId, table.language),
    foreignKey({
      name: "article_fk",
      columns: [table.articleId],
      foreignColumns: [articlesTable.id],
    }),
  ],
);

// export const articlesRelations = relations(articlesTable, ({ many }) => ({
//   translations: many(articleTranslationsTable),
// }));
