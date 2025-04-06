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
import type { ProductForm } from "@/lib/schema/product";
import { deleteThumbnail } from "@/service/admin";
import { useMutation } from "@tanstack/react-query";
import { upload } from "@vercel/blob/client";
import { LoaderIcon, TrashIcon } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { toast } from "sonner";

export function ProductForm({
  handleOnSubmit,
}: {
  handleOnSubmit: (product: ProductForm) => void;
}) {
  const form = useFormContext<ProductForm>();

  const uploadMutation = useMutation({
    mutationFn: async (file: File[]) => {
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

  const deleteMutation = useMutation({
    mutationFn: deleteThumbnail,
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // const thumbnail = form.getValues("thumbnail");
    // if (thumbnail) {
    //   deleteMutation.mutate(thumbnail);
    // }

    const file = e.target.files?.[0];
    if (!file) return;

    // Upload the file using the mutation
    uploadMutation.mutate(file);
  };

  // harus ada mekanisme delete
  return (
    <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-6">
      <FormField
        control={form.control}
        name="thumbnails"
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
              <ThumbnailGallery />
              {/* Hidden input to store the thumbnail URL */}
              {/* <input type="hidden" value={value || ""} {...field} /> */}
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

function ThumbnailGallery() {
  const thumbnails = useWatch<ProductForm, "thumbnails">({
    name: "thumbnails",
  });

  if (!thumbnails?.length) return null;

  return (
    <ul className="grid grid-cols-3 gap-2">
      {thumbnails.map((src, index) => (
        <li key={index} className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt="Thumbnail preview"
            className="w-full rounded object-cover"
          />
          <button
            type="button"
            className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white"
            // onClick={() => onDelete(src)}
          >
            <TrashIcon className="size-4" />
          </button>
        </li>
      ))}
    </ul>
  );
}
