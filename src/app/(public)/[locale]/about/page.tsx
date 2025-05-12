import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const aboutUsPoints = [
  {
    title: "list.first.title",
    description: "list.first.description",
    src: "https://yd1jimsuwvzgnhbn.public.blob.vercel-storage.com/Berry%201-zcqjXJpy5NKcf9geAdIYaV8qbrBaCc.jpg",
  },
  {
    title: "list.second.title",
    description: "list.second.description",
    src: "https://yd1jimsuwvzgnhbn.public.blob.vercel-storage.com/TB%208-YdYoBhytpEpPdyyIUvOBB6LKJbdqn8.jpg",
  },
  {
    title: "list.third.title",
    description: "list.third.description",
    src: "https://yd1jimsuwvzgnhbn.public.blob.vercel-storage.com/Tembaga%20Putih%207-YMYHgE4UNP4R90poForSbsFALS6iqq.jpg",
  },
];

export default async function AboutUsPage() {
  const t = await getTranslations("About");
  return (
    <main className="mb-12 flex flex-col gap-6 sm:gap-12">
      <section className="container grid overflow-hidden bg-brand-secondary px-0 max-sm:gap-6 max-sm:pt-6 sm:mt-6 sm:grid-cols-2 sm:gap-6 sm:rounded-xl">
        <div className="flex flex-col justify-center gap-2 max-sm:px-4 sm:ml-6">
          <h1>{t("heading")}</h1>
          <p className="mt-2">{t("heading_description")}</p>
        </div>

        <Image
          priority
          width={600}
          height={600}
          src="https://yd1jimsuwvzgnhbn.public.blob.vercel-storage.com/hero-bg-QbNufDfPMKPCBQEp4x43v55T1zJ3Bg.webp"
          alt="about us background"
          className="aspect-square w-full object-cover object-bottom"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </section>

      {aboutUsPoints.map((point, index) => (
        <section
          className="grid overflow-hidden rounded-xl bg-brand-secondary/50 max-sm:mx-4 sm:container sm:grid-cols-2 sm:px-0"
          key={index}
        >
          <Image
            priority
            width={600}
            height={450}
            src={point.src}
            alt="about us background"
            className="order-0 h-[450px] object-cover object-bottom sm:order-1 sm:w-full"
            sizes="(max-width: 640px) 100vw, 50vw"
          />

          <div
            className={cn(
              "flex flex-col justify-center gap-2 max-sm:p-4 sm:ml-6",
              index % 2 === 0 ? "sm:order-1" : "sm:order-0",
            )}
          >
            <h2 className="text-3xl">{t(point.title)}</h2>
            <p className="mt-2">{t(point.description)}</p>
          </div>
        </section>
      ))}
    </main>
  );
}
