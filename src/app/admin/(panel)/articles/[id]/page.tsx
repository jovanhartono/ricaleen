import { db } from "@/db";
import { articleTranslationsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await db
    .select()
    .from(articleTranslationsTable)
    .where(eq(articleTranslationsTable.id, Number(id)));

  return (
    <div>
      <article
        className="prose"
        dangerouslySetInnerHTML={{
          __html: article[0].content,
        }}
      ></article>
    </div>
  );
}
