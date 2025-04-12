"use client";

import { LanguageToggle } from "@/app/admin/(panel)/components/lang-toggle";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import type { ArticleDTO } from "@/service/admin";
import { LANGUAGE } from "@/types/enum";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import dayjs from "dayjs";
import { useState } from "react";

export function ArticleDetailDialog({ article }: { article: ArticleDTO }) {
  const [language, setLanguage] = useState<LANGUAGE>(LANGUAGE.ID);
  const title = language === LANGUAGE.ID ? article.titleId : article.titleEn;
  const content =
    language === LANGUAGE.ID ? article.contentId : article.contentEn;

  return (
    <DialogContent className="h-full w-full">
      <VisuallyHidden>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Article Detail</DialogDescription>
        </DialogHeader>
      </VisuallyHidden>

      <div className="mt-6 space-y-6">
        <div className="flex items-center gap-x-4">
          <p className="text-sm text-muted-foreground">
            {dayjs(article.createdAt).format("DD MMMM YYYY")}
          </p>
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>

        <h2 className="text-4xl font-semibold">{title}</h2>

        {article.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.thumbnail}
            alt="article thumbnail"
            className="aspect-video w-full rounded object-cover object-center"
          />
        )}

        <article
          className="prose"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    </DialogContent>
  );
}
