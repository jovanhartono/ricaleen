import { buttonVariants } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Products</h1>
        <Link className={buttonVariants()} href="/admin/products/add" prefetch>
          <PlusIcon />
          Add Product
        </Link>
      </div>

      {/* <Suspense fallback={<div>loading...</div>}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ArticlesTable />
        </HydrationBoundary>
      </Suspense> */}
    </div>
  );
}
