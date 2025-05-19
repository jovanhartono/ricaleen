"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { deleteProduct, type ProductDTO } from "@/service/admin";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ProductDetailDialog } from "@/app/admin/(panel)/products/product-detail-dialog";
import { useModal } from "@/app/providers";
import { toast } from "sonner";
import { EditProductDialog } from "@/app/admin/(panel)/products/edit-product-dialog";
import { LanguageToggle } from "@/app/admin/(panel)/components/lang-toggle";
import { LANGUAGE } from "@/types/enum";

export function ProductCard({ product }: { product: ProductDTO }) {
  const { openModal, closeModal } = useModal();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = product.thumbnails.length;

  const [language, setLanguage] = useState<LANGUAGE>(LANGUAGE.ID);
  const title = language === LANGUAGE.ID ? product.titleId : product.titleEn;
  const category =
    language === LANGUAGE.ID ? product.categoryNameId : product.categoryNameEn;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + totalImages) % totalImages,
    );
  };

  function handleDelete() {
    openModal({
      title: "Delete Product",
      description: "Are you sure you want to delete this product?",
      onConfirm: async () => {
        try {
          await deleteProduct(product.id);
          toast.success("Product deleted successfully");
          closeModal();
        } catch {
          toast.error("Failed to delete product");
        }
      },
    });
  }

  return (
    <Card
      key={product.id}
      className="group relative flex h-full flex-col overflow-hidden pt-0"
    >
      <div className="relative aspect-square">
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnails[currentImageIndex].url || "/placeholder.svg"}
          alt={`${product.titleEn} - Image ${currentImageIndex + 1}`}
          draggable="false"
          className="aspect-square h-full w-full object-cover object-center"
        />

        {totalImages > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 left-1 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background/90"
              onClick={(e) => {
                e.preventDefault();
                prevImage();
              }}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background/90"
              onClick={(e) => {
                e.preventDefault();
                nextImage();
              }}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>

            <div className="absolute right-0 bottom-2 left-0 flex justify-center gap-1">
              {product.thumbnails.map((_, index) => (
                <button
                  key={index}
                  className={`h-1.5 rounded-full ${
                    currentImageIndex === index
                      ? "w-3 bg-primary"
                      : "w-1.5 bg-primary/50"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex(index);
                  }}
                >
                  <span className="sr-only">Image {index + 1}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <CardContent className="space-y-3">
        <LanguageToggle language={language} setLanguage={setLanguage} />
        <div className="flex items-center gap-x-2">
          <Badge className="mb-2" variant="outline">
            {category}
          </Badge>
          <Dialog>
            <DialogTrigger className="text-sm font-medium text-primary hover:underline">
              <h2 className="line-clamp-2 text-lg font-semibold">{title}</h2>
            </DialogTrigger>
            <ProductDetailDialog product={product} />
          </Dialog>
        </div>
      </CardContent>

      <CardFooter className="justify-end gap-x-4 pt-0">
        <EditProductDialog product={product} />
        <span
          className="cursor-pointer text-destructive"
          onClick={handleDelete}
        >
          Delete
        </span>
      </CardFooter>
    </Card>
  );
}
