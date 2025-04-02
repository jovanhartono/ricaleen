"use client";

import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import type { Article } from "@/lib/schema/article";
import { deleteThumbnail } from "@/service/admin";
import { useMutation } from "@tanstack/react-query";
import { upload } from "@vercel/blob/client";
import { LoaderIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

export function ArticleForm({
  handleOnSubmit,
}: {
  handleOnSubmit: (article: Article) => void;
}) {
  const form = useFormContext<Article>();

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/thumbnail/upload",
      });
      return blob.url;
    },
    onSuccess: (url) => {
      form.setValue("thumbnail", url);
      toast.success("Thumbnail uploaded successfully");
    },
    onError: (error) => {
      toast.error("Failed to upload thumbnail");
      console.error(error);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const thumbnail = form.getValues("thumbnail");
    if (thumbnail) {
      deleteThumbnail(thumbnail);
    }

    const file = e.target.files?.[0];
    if (!file) return;

    // Upload the file using the mutation
    uploadMutation.mutate(file);
  };

  return (
    <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-6">
      <FormField
        control={form.control}
        name="thumbnail"
        render={({ field: { value, ...field } }) => (
          <FormItem>
            <FormLabel>Thumbnail</FormLabel>
            <div className="space-y-3">
              <FormControl>
                <div className="relative max-w-lg">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={uploadMutation.isPending}
                  />
                  {uploadMutation.isPending && (
                    <div className="absolute top-1/2 right-3 -translate-y-1/2">
                      <LoaderIcon className="size-4 animate-spin" />
                    </div>
                  )}
                </div>
              </FormControl>
              {form.watch("thumbnail") && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt="Thumbnail preview"
                  src={form.watch("thumbnail")!}
                  className="object-cover-md w-full max-w-lg rounded"
                />
              )}
              {/* Hidden input to store the thumbnail URL */}
              <input type="hidden" value={value || ""} {...field} />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

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
              <RichTextEditor onChange={field.onChange} content={field.value} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="titleEn"
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
              <RichTextEditor onChange={field.onChange} content={field.value} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        type="submit"
        disabled={form.formState.isSubmitting || uploadMutation.isPending}
        className={
          form.formState.isSubmitting ? "cursor-not-allowed opacity-50" : ""
        }
      >
        {form.formState.isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
