import { ProductCard } from "@/app/admin/(panel)/products/product-card";
import { buttonVariants } from "@/components/ui/button";
import { productsOptions } from "@/lib/query-options";
import { getProducts } from "@/service/admin";
import { QueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function AdminProductsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(productsOptions);

  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Products</h1>
        <Link className={buttonVariants()} href="/admin/products/add" prefetch>
          <PlusIcon />
          Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
