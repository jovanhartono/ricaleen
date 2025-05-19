ALTER TABLE "categories" ALTER COLUMN "thumbnail" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "order" integer DEFAULT 0 NOT NULL;