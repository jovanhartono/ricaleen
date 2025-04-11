"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Undo2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { ProductForm } from "@/app/admin/(panel)/products/form";
import {
  productSchema,
  type ProductForm as ProductFormType,
} from "@/lib/schema/product";
import { createProduct } from "@/service/admin";
import { useQueryClient } from "@tanstack/react-query";

export default function AddProductPage() {
  const queryClient = useQueryClient();
  const { push } = useRouter();

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

  async function handleOnSubmit(product: ProductFormType) {
    try {
      await createProduct(product);

      form.reset();

      toast.success("Upload product Success!", {
        action: {
          label: "Back to product",
          onClick: () => push("/admin/products"),
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    } catch {
      toast.error("Upload product Error. Please try again.");
    }
  }

  return (
    <div className="space-y-9">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-x-2 text-sm text-muted-foreground"
      >
        <Undo2Icon className="size-4" />
        Products
      </Link>
      <h1 className="text-2xl font-medium">Add Product</h1>
      <Form {...form}>
        <ProductForm handleOnSubmit={handleOnSubmit} />
      </Form>
    </div>
  );
}
