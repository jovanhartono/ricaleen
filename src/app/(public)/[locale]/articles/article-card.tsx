"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import type { ArticleDTO } from "@/service/admin";
import { useLocale } from "next-intl";

export function ArticleCard({ article }: { article: ArticleDTO }) {
  const locale = useLocale();
  const title = locale === "id" ? article.titleId : article.titleEn;

  return (
    <Link prefetch href={`/articles/${article.id}`}>
      <Card className="group relative flex h-full flex-col overflow-hidden pt-0">
        <div className="relative aspect-square">
          {article.thumbnail && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.thumbnail}
              alt={title}
              draggable="false"
              className="aspect-square h-full w-full object-cover object-center"
            />
          )}
        </div>

        <CardContent className="">
          <h2 className="line-clamp-2 text-lg font-semibold">{title}</h2>
        </CardContent>
      </Card>
    </Link>
  );
}
