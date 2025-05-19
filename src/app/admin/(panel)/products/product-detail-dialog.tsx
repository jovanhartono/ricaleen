import { Badge } from "@/components/ui/badge";
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
import { LanguageToggle } from "@/app/admin/(panel)/components/lang-toggle";

export function ProductDetailDialog({ product }: { product: ProductDTO }) {
  const [language, setLanguage] = useState<LANGUAGE>(LANGUAGE.ID);
  const categoryName =
    language === LANGUAGE.ID ? product.categoryNameId : product.categoryNameEn;

  return (
    <DialogContent className="h-full w-full sm:max-w-[1024px]">
      <VisuallyHidden>
        <DialogTitle>Product Detail</DialogTitle>
        <DialogDescription>Product Detail</DialogDescription>
      </VisuallyHidden>

      <div className="mt-6 grid grow grid-cols-2 gap-6">
        <Carousel className="mx-auto my-auto aspect-square w-full max-w-md border">
          <CarouselContent>
            {product.thumbnails.map((thumbnail, index) => (
              <CarouselItem key={index} className="relative aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbnail.url}
                  alt="product thumbnail"
                  className="h-full w-full object-cover object-center"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </Carousel>

        <div className="flex flex-col items-end space-y-3">
          <LanguageToggle language={language} setLanguage={setLanguage} />
          <div className="flex items-center gap-x-2">
            <Badge className="text-base" variant="secondary">
              {categoryName}
            </Badge>
            <h2 className="text-4xl font-semibold">
              {language === LANGUAGE.ID ? product.titleId : product.titleEn}
            </h2>
          </div>
          <article
            dangerouslySetInnerHTML={{
              __html:
                language === LANGUAGE.ID
                  ? product.contentId
                  : product.contentEn,
            }}
          />
        </div>
      </div>
    </DialogContent>
  );
}
