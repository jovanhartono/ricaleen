"use client";

import { ArticleForm } from "@/app/admin/(panel)/articles/form";
import { Button } from "@/components/ui/button";
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
import { createArticle } from "@/service/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddArticleDialog() {
  const { refresh } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      titleId: "",
      titleEn: "",
      contentId: "",
      contentEn: "",
    },
  });

  async function handleOnSubmit(article: ArticleFormValues) {
    try {
      await createArticle(article);
      form.reset();
      setOpen(false);
      toast.success("Create Article Success!");
      refresh();
    } catch {
      toast.error("Create Article Error. Please try again.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="ml-auto" asChild>
        <Button>
          <PlusIcon />
          Add Article
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full w-full">
        <DialogHeader>
          <DialogTitle>Add Article</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Add new article</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <Form {...form}>
          <ArticleForm handleOnSubmit={handleOnSubmit} type="create" />
        </Form>
      </DialogContent>
    </Dialog>
  );
}
