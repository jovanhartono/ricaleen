ALTER TABLE "product_thumbnails" DROP CONSTRAINT "product_thumbnails_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "product_thumbnails" ADD CONSTRAINT "product_thumbnails_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;