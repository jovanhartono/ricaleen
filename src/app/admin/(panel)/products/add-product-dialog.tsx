"use client";

import { ProductForm } from "@/app/admin/(panel)/products/form";
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
import { productSchema, type ProductFormValues } from "@/lib/schema/product";
import { createProduct } from "@/service/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { PlusIcon } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddProductDialog() {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      contentId: "",
      contentEn: "",
      titleId: "",
      titleEn: "",
      thumbnails: [],
    },
  });

  async function handleOnSubmit(product: ProductFormValues) {
    try {
      await createProduct(product);
      form.reset();
      toast.success("Upload product Success!");
      closeButtonRef.current?.click();
    } catch {
      toast.error("Upload product Error. Please try again.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>add product</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <DialogClose ref={closeButtonRef} />

        <Form {...form}>
          <ProductForm handleOnSubmit={handleOnSubmit} />
        </Form>
      </DialogContent>
    </Dialog>
  );
}
