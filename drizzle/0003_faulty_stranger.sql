CREATE TABLE "product_thumbnails" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "product_thumbnails_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"product_id" integer NOT NULL,
	"url" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product_thumbnails" ADD CONSTRAINT "product_thumbnails_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "thumbnail";