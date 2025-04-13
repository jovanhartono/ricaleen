import { Prose } from "@/components/ui/prose";
import { db } from "@/db";
import { articlesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const locale = await getLocale();
  const { id } = await params;
  const [article] = await db
    .select()
    .from(articlesTable)
    .where(eq(articlesTable.id, id))
    .limit(1);

  if (!article) return notFound();
  const title = locale === "id" ? article.titleId : article.titleEn;
  const content = locale === "id" ? article.contentId : article.contentEn;

  return (
    <main className="container flex max-w-screen-lg py-6 sm:py-12">
      <article className="space-y-9">
        <h1>{title}</h1>
        {article.thumbnail && (
          <Image
            className="aspect-square rounded-xl object-cover object-center sm:aspect-video"
            width={1024}
            height={600}
            src={article.thumbnail}
            alt={title}
          />
        )}
        <Prose body={content} />
      </article>
    </main>
  );
}
