"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useSanitizedText } from "@/hooks/useSanitizedText";
import { Link } from "@/i18n/navigation";
import type { ProductDTO } from "@/service/admin";
import { useLocale } from "next-intl";
import Image from "next/image";

export function ProductCard({ product }: { product: ProductDTO }) {
  const locale = useLocale();
  const title = locale === "id" ? product.titleId : product.titleEn;
  const content = locale === "id" ? product.contentId : product.contentEn;
  const textContent = useSanitizedText(content);

  return (
    <Link prefetch href={`/products/${product.id}`}>
      <Card className="gap-4 border-none p-0 shadow-none">
        <div className="relative aspect-square">
          {product.thumbnails.length && (
            <Image
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              src={product.thumbnails[0]}
              alt={title}
              draggable="false"
              className="aspect-square h-full w-full rounded object-cover object-center"
            />
          )}
        </div>

        <CardContent className="p-0">
          <h2 className="line-clamp-2 text-lg font-semibold">{title}</h2>
          <p className="mt-3 line-clamp-3">{textContent}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
