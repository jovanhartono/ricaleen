import { AddArticleDialog } from "@/app/admin/(panel)/articles/add-article-dialog";
import { ArticlesTable } from "@/app/admin/(panel)/articles/table";
import { articleOptions } from "@/lib/query-options";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

export default async function AdminArticlesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(articleOptions);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Articles</h1>
        <AddArticleDialog />
      </div>

      <Suspense fallback={<div>loading...</div>}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ArticlesTable />
        </HydrationBoundary>
      </Suspense>
    </div>
  );
}
