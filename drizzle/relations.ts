import { relations } from "drizzle-orm/relations";
import { categories, products, productThumbnails } from "./schema";

export const productsRelations = relations(products, ({one, many}) => ({
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.id]
	}),
	productThumbnails: many(productThumbnails),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	products: many(products),
}));

export const productThumbnailsRelations = relations(productThumbnails, ({one}) => ({
	product: one(products, {
		fields: [productThumbnails.productId],
		references: [products.id]
	}),
}));