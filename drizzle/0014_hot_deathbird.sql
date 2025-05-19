ALTER TABLE "product_thumbnails" ADD COLUMN "order" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "order";