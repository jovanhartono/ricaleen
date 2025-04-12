import { ArticleForm } from "@/app/admin/(panel)/articles/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { articleSchema, type ArticleFormValues } from "@/lib/schema/article";
import { updateArticle, type ArticleDTO } from "@/service/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function EditArticleDialog({ article }: { article: ArticleDTO }) {
  const { refresh } = useRouter();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const form = useForm({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      titleId: article.titleId,
      titleEn: article.titleEn,
      contentId: article.contentId,
      contentEn: article.contentEn,
      thumbnail: article.thumbnail,
    },
  });

  useEffect(() => {
    form.reset(article);
  }, [article, form]);

  async function handleOnSubmit(articleFormValue: ArticleFormValues) {
    try {
      await updateArticle(article.id, articleFormValue);
      closeButtonRef.current?.click();
      toast.success("Edit Article Success!");
      refresh();
    } catch {
      toast.error("Edit Article Error. Please try again.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <span className="font-medium">Edit</span>
      </DialogTrigger>
      <DialogContent className="h-full w-full">
        <DialogHeader>
          <DialogTitle>Edit Article</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Edit article</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <Form {...form}>
          <ArticleForm handleOnSubmit={handleOnSubmit} type="edit" />
        </Form>

        <VisuallyHidden>
          <DialogClose ref={closeButtonRef} />
        </VisuallyHidden>
      </DialogContent>
    </Dialog>
  );
}
