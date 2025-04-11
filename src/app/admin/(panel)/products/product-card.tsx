"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { ProductDTO } from "@/service/admin";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ProductDetailDialog } from "@/app/admin/(panel)/products/product-detail-dialog";

export function ProductCard({ product }: { product: ProductDTO }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = product.thumbnails.length;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + totalImages) % totalImages,
    );
  };

  return (
    <Card
      key={product.id}
      className="group relative flex h-full flex-col overflow-hidden"
    >
      <div className="relative aspect-square">
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnails[currentImageIndex] || "/placeholder.svg"}
          alt={`${product.titleEn} - Image ${currentImageIndex + 1}`}
          draggable="false"
          className="h-full w-full object-cover object-center p-6"
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

      <Button
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
        onClick={(e) => {
          e.preventDefault();
          // setShowDeleteDialog(true);
        }}
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete product</span>
      </Button>

      <CardContent className="flex-grow pt-4">
        <Badge className="mb-2" variant="outline">
          {product.categoryName}
        </Badge>
        <h2 className="line-clamp-2 text-lg font-semibold">
          {product.titleId}
        </h2>
      </CardContent>

      <CardFooter className="pt-0">
        <Dialog>
          <DialogTrigger className="text-sm font-medium text-primary hover:underline">
            View Details
          </DialogTrigger>
          <ProductDetailDialog product={product} />
        </Dialog>
      </CardFooter>
    </Card>
  );
}
