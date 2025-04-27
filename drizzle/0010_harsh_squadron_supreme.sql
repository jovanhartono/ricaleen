ALTER TABLE "categories" RENAME COLUMN "name" TO "name_en";--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "name_id" text;--> statement-breakpoint
CREATE INDEX "category_id_idx" ON "categories" USING btree ("id");--> statement-breakpoint
CREATE INDEX "product_id_idx" ON "products" USING btree ("id");