"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { type Article, articleSchema } from "@/lib/schema/article";
import { uploadArticle } from "@/service/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Undo2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const formDefaultValues = {
  titleId: "",
  titleEn: "",
  contentId: "",
  contentEn: "",
};

export default function AddArticlePage() {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(articleSchema),
    defaultValues: formDefaultValues,
  });

  async function handleOnSubmit(article: Article) {
    // insert to db
    try {
      await uploadArticle(article);
      form.reset(formDefaultValues);
      toast.success("Upload Article Success!", {
        action: {
          label: "Back to Article",
          onClick: () => push("/admin/articles"),
        },
      });
    } catch {
      toast.error("Upload Article Error. Please try again.");
    }
  }

  return (
    <div className="space-y-9">
      <Link
        href="/admin/articles"
        className="inline-flex items-center gap-x-2 text-sm text-muted-foreground"
      >
        <Undo2Icon className="size-4" />
        Article
      </Link>
      <h1 className="text-2xl font-medium">Add Article</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="titleId"
            render={({ field }) => (
              <FormItem className="max-w-lg">
                <FormLabel>Title Indonesia</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content Indonesia</FormLabel>
                <FormControl>
                  <RichTextEditor
                    onChange={field.onChange}
                    content={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="titleId"
            render={({ field }) => (
              <FormItem className="max-w-lg">
                <FormLabel>Title English</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contentEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content English</FormLabel>
                <FormControl>
                  <RichTextEditor
                    onChange={field.onChange}
                    content={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" loading={form.formState.isSubmitting}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
