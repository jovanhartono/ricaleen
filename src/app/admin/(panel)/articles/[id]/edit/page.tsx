import { ArticleFormWrapper } from "@/app/admin/(panel)/articles/[id]/edit/form-wrapper.client";
import { db } from "@/db";
import { articlesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Undo2Icon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const articles = await db
    .select()
    .from(articlesTable)
    .where(eq(articlesTable.id, Number(id)));

  if (!articles.length) return notFound();

  return (
    <div className="space-y-9">
      <Link
        href="/admin/articles"
        className="inline-flex items-center gap-x-2 text-sm text-muted-foreground"
      >
        <Undo2Icon className="size-4" />
        Article
      </Link>
      <h1 className="text-2xl font-medium">Edit Article</h1>
      <ArticleFormWrapper id={id} article={articles[0]} />
    </div>
  );
}
