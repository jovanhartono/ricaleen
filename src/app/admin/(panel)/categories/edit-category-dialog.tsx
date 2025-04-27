"use client";

import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { updateCategory, type CategoryDTO } from "@/service/admin";
import { useRouter } from "next/navigation";
import {
  categorySchema,
  type CategoryForm as CategoryFormType,
} from "@/lib/schema/category";
import { toast } from "sonner";
import { CategoryForm } from "@/app/admin/(panel)/categories/category-form";

export function EditCategoryDialog({ category }: { category: CategoryDTO }) {
  const { refresh } = useRouter();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<CategoryFormType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name_id: category.name_id,
      name_en: category.name_en,
      description: category.description || "",
      thumbnail: category.thumbnail,
    },
  });

  const handleOnSubmit = async (values: CategoryFormType) => {
    try {
      await updateCategory(category.id, values);
      toast.success("Upload Category Success!");
      closeButtonRef.current?.click();
      refresh();
    } catch {
      toast.error("Upload Category Error. Please try again.");
    }
  };
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogDescription>edit existing category.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <CategoryForm handleOnSubmit={handleOnSubmit} />
      </Form>
      <DialogClose ref={closeButtonRef} />
    </DialogContent>
  );
}
