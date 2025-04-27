"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { categorySchema } from "@/lib/schema/category";
import { CategoryForm } from "@/app/admin/(panel)/categories/category-form";
import type { CategoryForm as CategoryFormType } from "@/lib/schema/category";
import { createCategory } from "@/service/admin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRef } from "react";

export function AddCategoryDialog() {
  const { refresh } = useRouter();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<CategoryFormType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name_id: "",
      name_en: "",
      description: "",
    },
  });

  const handleOnSubmit = async (values: CategoryFormType) => {
    try {
      await createCategory(values);
      refresh();
      toast.success("Upload Category Success!");
      form.reset();
      closeButtonRef.current?.click();
    } catch {
      toast.error("Upload Category Error. Please try again.");
    }
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogDescription>
          Create a new category to organize your items.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <CategoryForm handleOnSubmit={handleOnSubmit} />
      </Form>
      <DialogClose ref={closeButtonRef} />
    </DialogContent>
  );
}
