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
import { RadioGroup } from "@/components/ui/radio-group";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { type Article, articleSchema } from "@/lib/schema/article";
import { uploadArticle } from "@/service/admin";
import { LANGUAGE } from "@/types/enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { CheckIcon, Undo2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const formDefaultValues = {
  title: "",
  language: LANGUAGE.ID,
  content: "",
};

export default function AddArticlePage() {
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
            name="title"
            render={({ field }) => (
              <FormItem className="max-w-lg">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Article title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="max-w-lg space-y-3">
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex gap-12 *:flex-1"
                  >
                    {[LANGUAGE.ID, LANGUAGE.EN].map((language) => (
                      <RadioGroupItem
                        key={language}
                        value={language}
                        className="group flex cursor-pointer items-center space-x-3 rounded-md border p-3 data-[state=checked]:ring-2 data-[state=checked]:ring-primary"
                      >
                        <span>{language}</span>
                        <CheckIcon className="hidden size-4 group-data-[state=checked]:block" />
                      </RadioGroupItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
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
