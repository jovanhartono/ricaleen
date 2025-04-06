import { ArticlesTable } from "@/components/articles-table";
import { buttonVariants } from "@/components/ui/button";
import { articleOptions } from "@/lib/query-options";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function AdminArticlesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(articleOptions);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Articles</h1>
        <Link className={buttonVariants()} href="/admin/articles/add" prefetch>
          <PlusIcon />
          Add Article
        </Link>
      </div>

      <Suspense fallback={<div>loading...</div>}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ArticlesTable />
        </HydrationBoundary>
      </Suspense>
    </div>
  );
}
