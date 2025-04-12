"use client";

import { LanguageToggle } from "@/app/admin/(panel)/components/lang-toggle";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { ArticleDTO } from "@/service/admin";
import { LANGUAGE } from "@/types/enum";
import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ArticleDetailDialog } from "@/app/admin/(panel)/articles/article-detail-dialog";
import { useSanitizedText } from "@/hooks/useSanitizedText";
import { EditArticleDialog } from "@/app/admin/(panel)/articles/edit-article-dialog";
import { DeleteArticleDialog } from "@/app/admin/(panel)/articles/delete-article.dialog";

export function ArticleCard({ article }: { article: ArticleDTO }) {
  const [language, setLanguage] = useState<LANGUAGE>(LANGUAGE.ID);
  const title = language === LANGUAGE.ID ? article.titleId : article.titleEn;
  const content =
    language === LANGUAGE.ID ? article.contentId : article.contentEn;

  const textContent = useSanitizedText(content);

  return (
    <Card
      key={article.id}
      className="group relative flex h-full flex-col overflow-hidden pt-0"
    >
      <div className="relative aspect-square">
        {article.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.thumbnail}
            alt={article.titleId}
            draggable="false"
            className="aspect-square h-full w-full object-cover object-center"
          />
        )}
      </div>

      <CardContent className="space-y-3">
        <LanguageToggle language={language} setLanguage={setLanguage} />
        <Dialog>
          <DialogTrigger>
            <h2 className="line-clamp-2 text-lg font-semibold">{title}</h2>
          </DialogTrigger>
          <ArticleDetailDialog article={article} />
        </Dialog>
        <p className="line-clamp-3">{textContent}</p>
      </CardContent>

      <CardFooter className="justify-end gap-x-4 pt-0">
        <EditArticleDialog article={article} />
        <DeleteArticleDialog id={article.id} />
      </CardFooter>
    </Card>
  );
}
