import { AddProductDialog } from "@/app/admin/(panel)/products/add-product-dialog";
import { ProductCard } from "@/app/admin/(panel)/products/product-card";
import { getProducts } from "@/service/admin";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Products</h1>
        <AddProductDialog />
      </div>

      {products.length === 0 && (
        <div className="mt-24 text-center text-secondary-foreground">
          No products found. Please add your first product.
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
