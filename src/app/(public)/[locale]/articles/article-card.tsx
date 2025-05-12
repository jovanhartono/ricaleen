"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import type { ArticleDTO } from "@/service/admin";
import { useLocale } from "next-intl";
import Image from "next/image";

export function ArticleCard({ article }: { article: ArticleDTO }) {
  const locale = useLocale();
  const title = locale === "id" ? article.titleId : article.titleEn;

  return (
    <Link prefetch href={`/articles/${article.id}`}>
      <Card className="group relative flex h-full flex-col overflow-hidden pt-0">
        {article.thumbnail && (
          <Image
            width={400}
            height={400}
            src={article.thumbnail}
            alt={title}
            draggable="false"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="aspect-square h-full w-full object-cover object-center"
          />
        )}

        <CardContent className="">
          <h2 className="line-clamp-2 text-lg font-semibold">{title}</h2>
        </CardContent>
      </Card>
    </Link>
  );
}
