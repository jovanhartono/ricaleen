import { db } from "@/db";
import { articlesTable } from "@/db/schema";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { Undo2Icon } from "lucide-react";
import Link from "next/link";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [article] = await db
    .select()
    .from(articlesTable)
    .where(eq(articlesTable.id, Number(id)));

  return (
    <div className="space-y-9">
      <Link
        href="/admin/articles"
        className="inline-flex items-center gap-x-2 text-sm text-muted-foreground"
      >
        <Undo2Icon className="size-4" />
        Article
      </Link>
      <span className="mt-9 text-sm text-muted-foreground">
        {dayjs(article.createdAt).format("DD MMMM YYYY")}
      </span>
      <div className="grid grid-cols-2 gap-x-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{article.titleId}</h1>
          <article
            className="prose mt-12"
            dangerouslySetInnerHTML={{
              __html: article.contentId,
            }}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{article.titleEn}</h1>
          <article
            className="prose mt-12"
            dangerouslySetInnerHTML={{
              __html: article.contentEn,
            }}
          />
        </div>
      </div>
    </div>
  );
}
