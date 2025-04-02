"use client";

import { ArticleForm } from "@/app/admin/(panel)/articles/form";
import { Form } from "@/components/ui/form";
import { articleSchema, type Article } from "@/lib/schema/article";
import { updateArticle, type ArticleDTO } from "@/service/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function ArticleFormWrapper({
  id,
  article,
}: {
  id: string;
  article: ArticleDTO;
}) {
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      titleEn: article.titleEn,
      titleId: article.titleId,
      contentId: article.contentId,
      contentEn: article.contentEn,
      thumbnail: article.thumbnail,
    },
  });

  async function handleOnSubmit(article: Article) {
    try {
      await updateArticle(Number(id), article);

      form.reset();

      toast.success("Update Article Success!", {
        action: {
          label: "Back to Article",
          onClick: () => push("/admin/articles"),
        },
      });
    } catch {
      toast.error("Update Article Error. Please try again.");
    }
  }
  return (
    <Form {...form}>
      <ArticleForm handleOnSubmit={handleOnSubmit} />
    </Form>
  );
}
