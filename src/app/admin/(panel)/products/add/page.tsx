"use client";

import { type Article, articleSchema } from "@/lib/schema/article";
import { zodResolver } from "@hookform/resolvers/zod";
import { Undo2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { uploadArticle } from "@/service/admin";
import { Form } from "@/components/ui/form";
import { ProductForm } from "@/app/admin/(panel)/products/form";

export default function AddProductPage() {
  const { push } = useRouter();

  const form = useForm({
    resolver: zodResolver(articleSchema),
  });

  async function handleOnSubmit(article: Article) {
    try {
      // await uploadArticle(article);

      form.reset();

      toast.success("Upload product Success!", {
        action: {
          label: "Back to product",
          onClick: () => push("/admin/products"),
        },
      });
    } catch {
      toast.error("Upload product Error. Please try again.");
    }
  }

  return (
    <div className="space-y-9">
      <Link
        href="/admin/articles"
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
