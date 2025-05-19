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
      <section className="grid gap-6 sm:container">
        <Carousel className="sm:hidden">
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

        <div className="flex flex-col max-sm:container">
          <h2>{title}</h2>
          <Prose body={content} />
        </div>
      </section>

      <section className="container max-sm:hidden">
        <ul className="grid grid-cols-2 gap-2 xl:grid-cols-3">
          {product.thumbnails.map((thumbnail, index) => (
            <li key={index}>
              <Image
                alt={`${title} - thumbnail ${index + 1}`}
                width={410}
                height={410}
                className="aspect-square w-full object-cover object-center"
                src={thumbnail}
                sizes="(max-width: 1280px) 50vw, 33vw"
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
