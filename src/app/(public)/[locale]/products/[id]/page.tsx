import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Prose } from "@/components/ui/prose";
import { getProductById } from "@/service/admin";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const locale = await getLocale();
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) return notFound();

  const title = locale === "id" ? product.titleId : product.titleEn;
  const content = locale === "id" ? product.contentId : product.contentEn;

  return (
    <main className="py-6 sm:py-12">
      <section className="grid gap-6 sm:container sm:grid-cols-2">
        <Carousel>
          <CarouselContent>
            {product.thumbnails.map((thumbnail, index) => (
              <CarouselItem key={index} className="relative aspect-square">
                <Image
                  fill
                  src={thumbnail}
                  alt={title}
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 628w"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="flex flex-col max-sm:container sm:items-end sm:*:text-right">
          <h2>{title}</h2>
          <Prose body={content} />
        </div>
      </section>
    </main>
  );
}
