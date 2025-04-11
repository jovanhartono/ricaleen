import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ProductDTO } from "@/service/admin";
import { LANGUAGE } from "@/types/enum";
import { useState } from "react";

export function ProductDetailDialog({ product }: { product: ProductDTO }) {
  const [selectedLanguage, setSelectedLanguage] = useState<LANGUAGE>(
    LANGUAGE.ID,
  );

  return (
    <DialogContent className="h-full w-full sm:max-w-[1024px]">
      <VisuallyHidden>
        <DialogTitle>Product Detail</DialogTitle>
        <DialogDescription>Product Detail</DialogDescription>
      </VisuallyHidden>

      <div className="mt-6 grid grow grid-cols-2 gap-6">
        <Carousel className="mx-auto my-auto aspect-square w-full max-w-md">
          <CarouselContent>
            {product.thumbnails.map((thumbnail, index) => (
              <CarouselItem key={index} className="relative aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbnail}
                  alt="product thumbnail"
                  className="h-full w-full object-contain object-center"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </Carousel>

        <div className="flex flex-col items-end space-y-3">
          <div className="flex items-center gap-x-2 p-1.5">
            <Button
              size="sm"
              variant={selectedLanguage === LANGUAGE.ID ? "default" : "outline"}
              onClick={() => setSelectedLanguage(LANGUAGE.ID)}
            >
              ID
            </Button>
            <Button
              size="sm"
              variant={selectedLanguage === LANGUAGE.EN ? "default" : "outline"}
              onClick={() => setSelectedLanguage(LANGUAGE.EN)}
            >
              EN
            </Button>
          </div>
          <div className="flex items-center gap-x-2">
            <Badge className="text-base" variant="secondary">
              {product.categoryName}
            </Badge>
            <h2 className="text-4xl font-semibold">
              {selectedLanguage === LANGUAGE.ID
                ? product.titleId
                : product.titleEn}
            </h2>
          </div>
          <article
            dangerouslySetInnerHTML={{
              __html:
                selectedLanguage === LANGUAGE.ID
                  ? product.contentId
                  : product.contentEn,
            }}
          />
        </div>
      </div>
    </DialogContent>
  );
}
