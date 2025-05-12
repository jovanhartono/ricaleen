import { ProductForm } from "@/app/admin/(panel)/products/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { productSchema, type ProductFormValues } from "@/lib/schema/product";
import { updateProduct, type ProductDTO } from "@/service/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function EditProductDialog({ product }: { product: ProductDTO }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ...product,
      thumbnails: product.thumbnails.map((thumbnail) => ({
        url: thumbnail,
      })),
    },
  });

  useEffect(() => {
    form.reset({
      ...product,
      thumbnails: product.thumbnails.map((thumbnail) => ({
        url: thumbnail,
      })),
    });
  }, [form, product]);

  async function handleOnSubmit(ProductFormValues: ProductFormValues) {
    try {
      await updateProduct(product.id, ProductFormValues);
      form.reset();
      toast.success("Update product Success!");
      closeButtonRef.current?.click();
    } catch {
      toast.error("Update product Error. Please try again.");
    }
  }
  return (
    <Dialog>
      <DialogTrigger>Edit</DialogTrigger>

      <DialogContent>
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Edit the product details.</DialogDescription>
          </DialogHeader>
        </VisuallyHidden>

        <DialogClose ref={closeButtonRef} />

        <Form {...form}>
          <ProductForm handleOnSubmit={handleOnSubmit} />
        </Form>
      </DialogContent>
    </Dialog>
  );
}
