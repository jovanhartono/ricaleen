ALTER TABLE "article_translations" RENAME COLUMN "articleId" TO "article_id";--> statement-breakpoint
ALTER TABLE "article_translations" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "article_translations" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "articles" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "articles" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "article_translations" DROP CONSTRAINT "article_translations_articleId_language_unique";--> statement-breakpoint
ALTER TABLE "article_translations" DROP CONSTRAINT "article_translations_articleId_articles_id_fk";
--> statement-breakpoint
ALTER TABLE "article_translations" DROP CONSTRAINT "article_fk";
--> statement-breakpoint
DROP INDEX "article_group_id_idx";--> statement-breakpoint
ALTER TABLE "article_translations" ADD CONSTRAINT "article_translations_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_translations" ADD CONSTRAINT "article_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "article_group_id_idx" ON "article_translations" USING btree ("article_id");--> statement-breakpoint
ALTER TABLE "article_translations" ADD CONSTRAINT "article_translations_article_id_language_unique" UNIQUE("article_id","language");