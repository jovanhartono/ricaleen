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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProductFormValues } from "@/lib/schema/product";
import { deleteThumbnail, getCategories } from "@/service/admin";
import { useMutation, useQuery } from "@tanstack/react-query";
import { upload } from "@vercel/blob/client";
import { LoaderIcon, TrashIcon } from "lucide-react";
import { memo, useState } from "react";
import {
  useFieldArray,
  useFormContext,
  type FieldArrayWithId,
  type UseFieldArrayMove,
  type UseFieldArrayRemove,
} from "react-hook-form";
import { toast } from "sonner";
import {
  useSensors,
  useSensor,
  PointerSensor,
  DndContext,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function ProductForm({
  handleOnSubmit,
}: {
  handleOnSubmit: (product: ProductFormValues) => void;
}) {
  const [selectedTab, setSelectedTab] = useState<string>("id");
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const form = useFormContext<ProductFormValues>();
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "thumbnails",
  });

  const uploadMutation = useMutation({
    mutationFn: async (files: FileList) => {
      const blobs = await Promise.all(
        Array.from(files).map((file) =>
          upload(file.name, file, {
            access: "public",
            handleUploadUrl: "/api/thumbnail/upload",
          }),
        ),
      );

      return blobs.map(({ url }) => url);
    },
    onSuccess: (urls) => {
      urls.forEach((url) => {
        append({ url, id: null });
      });

      toast.success("Images uploaded successfully");
    },
    onError: (error) => {
      toast.error("Failed to upload image");
      console.error(error);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    uploadMutation.mutate(files);
  };

  return (
    <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-6">
      <Tabs
        className="space-y-6"
        value={selectedTab}
        onValueChange={setSelectedTab}
      >
        <TabsList>
          <TabsTrigger value="id">ID</TabsTrigger>
          <TabsTrigger value="en">EN</TabsTrigger>
        </TabsList>

        <FormField
          control={form.control}
          name="thumbnails"
          render={() => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <div className="space-y-3">
                <FormControl>
                  <div className="relative max-w-lg">
                    <Input
                      multiple
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
                <ThumbnailGallery fields={fields} remove={remove} move={move} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger className="w-full max-w-lg">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {selectedTab === "id"
                        ? category.name_id
                        : category.name_en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <TabsContent value="id" className="space-y-6">
          <FormField
            control={form.control}
            name="titleId"
            render={({ field }) => (
              <FormItem className="max-w-lg">
                <FormLabel>Title</FormLabel>
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
                <FormLabel>Content</FormLabel>
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
        </TabsContent>

        <TabsContent value="en" className="space-y-6">
          <FormField
            control={form.control}
            name="titleEn"
            render={({ field }) => (
              <FormItem className="max-w-lg">
                <FormLabel>Title</FormLabel>
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
                <FormLabel>Content</FormLabel>
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
        </TabsContent>
      </Tabs>

      <Button
        type="submit"
        disabled={
          form.formState.isSubmitting ||
          !form.formState.isValid ||
          uploadMutation.isPending
        }
        className={
          form.formState.isSubmitting ? "cursor-not-allowed opacity-50" : ""
        }
      >
        {form.formState.isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}

const SortableThumbnail = memo(function SortableThumbnail({
  id,
  url,
  onDelete,
}: {
  id: string;
  url: string;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      className="relative aspect-square rounded border"
    >
      <button
        type="button"
        className="absolute top-2 right-2 cursor-pointer rounded-full bg-red-500 p-1 text-white"
        onClick={onDelete}
      >
        <TrashIcon className="size-4" />
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt="Products preview"
        className="aspect-square w-full rounded object-contain object-center"
        {...attributes}
        {...listeners}
      />
    </li>
  );
});

function ThumbnailGallery({
  fields: thumbnails,
  remove,
  move,
}: {
  fields: FieldArrayWithId<ProductFormValues, "thumbnails">[];
  remove: UseFieldArrayRemove;
  move: UseFieldArrayMove;
}) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDelete = (index: number, url: string) => () => {
    remove(index);
    deleteThumbnail(url);
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = thumbnails.findIndex((item) => item.id === active.id);
      const newIndex = thumbnails.findIndex((item) => item.id === over?.id);
      move(oldIndex, newIndex);
    }
  }

  if (!thumbnails?.length) return null;

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={thumbnails.map((item) => item.id)}>
        <ul className="grid grid-cols-3 gap-4">
          {thumbnails.map(({ url, id }, index) => (
            <SortableThumbnail
              key={id}
              id={id}
              url={url}
              onDelete={handleDelete(index, url)}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
