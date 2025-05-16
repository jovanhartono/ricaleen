import { ArticleCard } from "@/app/(public)/[locale]/articles/article-card";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/db";
import { articlesTable } from "@/db/schema";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { getCategories, type CategoryDTO } from "@/service/admin";
import { desc } from "drizzle-orm";
import {
  ArrowUpRight,
  BlocksIcon,
  ChartNoAxesColumnIncreasing,
  DatabaseIcon,
  GlobeIcon,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Suspense } from "react";

const edgePoints = [
  {
    icon: ChartNoAxesColumnIncreasing,
    title: "usp_point_one_title",
    description: "usp_point_one_description",
  },
  {
    icon: BlocksIcon,
    title: "usp_point_two_title",
    description: "usp_point_two_description",
  },
  {
    icon: DatabaseIcon,
    title: "usp_point_three_title",
    description: "usp_point_three_description",
  },
  {
    icon: GlobeIcon,
    title: "usp_point_four_title",
    description: "usp_point_four_description",
  },
];

export default async function Home() {
  const t = await getTranslations("HomePage");
  return (
    <main className="flex flex-col">
      <section className="relative -mt-20 flex h-[calc(100vh)] flex-col justify-center gap-y-6">
        <div className="relative z-10 container space-y-4 py-6 sm:py-12">
          <h1 className="text-white">{t("hero_title")}</h1>
          <h2 className="w-3/4 text-xl font-medium text-balance text-white">
            {t("hero_description")}
          </h2>
          <Link
            prefetch
            href="/about"
            className="mt-3 inline-flex h-9 items-center gap-2 rounded-xl px-4 font-semibold text-white ring-2 ring-white"
          >
            {t("hero_cta")}
            <ArrowUpRight />
          </Link>
        </div>
        <Image
          priority
          fill
          src="https://yd1jimsuwvzgnhbn.public.blob.vercel-storage.com/hero-bg-QbNufDfPMKPCBQEp4x43v55T1zJ3Bg.webp"
          alt="hero background"
          className="h-[600px] object-cover object-bottom brightness-30"
          sizes="100vw"
        />
      </section>

      <section id="about" className="container space-y-12 py-6 md:py-12">
        <h2>
          {t("about_title")}
          <br />
          <span className="font-normal">{t("about_extended_title")}</span>
        </h2>
        <div className="grid sm:grid-cols-[minmax(400px,_40%)_60%] sm:gap-x-0">
          <div className="relative z-10 self-center rounded-t bg-brand px-6 py-8 *:text-balance sm:rounded [&_>p]:mb-4 [&_>p]:text-primary-foreground/90 max-sm:[&>_p]:text-sm">
            <h3 className="mb-6 text-2xl font-medium text-primary-foreground">
              {t("about_second_title")}
            </h3>
            <p>{t("about_first_description")}</p>
            <p>{t("about_second_description")}</p>
            <p>{t("about_third_description")}</p>
          </div>
          <div className="relative h-[400px] md:-ml-[15%] md:h-[550px]">
            <Image
              fill
              src="https://yd1jimsuwvzgnhbn.public.blob.vercel-storage.com/home-about-k97vQueEF7Hiyax9V90GLcTnEIV1my.webp"
              alt="Company history"
              className="rounded-b object-cover object-center brightness-90 sm:rounded"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 60vw, 900w"
            />
          </div>
        </div>
      </section>
      <section
        id="services"
        className="flex flex-col gap-8 bg-brand-secondary px-4 py-8 sm:gap-16 sm:py-16"
      >
        <div className="flex flex-col">
          <h2 className="mx-auto text-center text-balance">
            <strong className="font-medium">
              {t("usp_title")}
              <br />
            </strong>
            <span className="font-normal text-slate-500">
              {t("usp_extended_title")}
            </span>
          </h2>
        </div>

        <dl className="container grid grid-cols-1 overflow-hidden rounded-4xl bg-white px-0 shadow-xs sm:grid-cols-2">
          {edgePoints.map(({ title, description, ...item }, index) => (
            <div
              key={index}
              className="-mr-px -mb-px border-r border-b px-6 py-10"
            >
              <div className="flex aspect-square size-10 items-center justify-center rounded-md p-2 shadow">
                <item.icon className="h-8 w-8 text-brand" />
              </div>
              <dt className="mt-6 text-2xl font-medium tracking-tight text-brand">
                {t(title)}
              </dt>
              <dd
                className="prose mt-1.5 text-slate-600 prose-strong:text-brand"
                dangerouslySetInnerHTML={{
                  __html: t.raw(description),
                }}
              ></dd>
            </div>
          ))}
        </dl>
      </section>
      <Suspense>
        <ProductCategorySection />
      </Suspense>
      <Suspense>
        <ArticlesSection />
      </Suspense>
    </main>
  );
}

async function Category({ category }: { category: CategoryDTO }) {
  const locale = await getLocale();
  const title = locale === "id" ? category.name_id : category.name_en;

  return (
    <figure className="space-y-3">
      {category.thumbnail && (
        <Link
          prefetch
          href={{
            pathname: "/products",
            query: {
              category: category.slug,
            },
          }}
          className="block"
        >
          <Image
            draggable="false"
            width={350}
            height={440}
            alt={title}
            src={category.thumbnail}
            className="aspect-[4/5] h-full object-cover object-center brightness-75"
            sizes="(max-width: 640px) 75vw, 33vw"
          />
        </Link>
      )}

      <figcaption className="font-semibold tracking-tighter text-brand">
        {title}
      </figcaption>
    </figure>
  );
}

async function ProductCategorySection() {
  const t = await getTranslations("HomePage");
  const categories = await getCategories();

  return (
    <section className="container grid gap-6 overflow-hidden py-6 sm:grid-cols-3 sm:py-12">
      <div className="flex flex-col justify-end space-y-3">
        <h2 className="mt-auto tracking-tight">
          {t("products_section_heading")}
        </h2>
        <Link
          prefetch
          href="/products"
          className={cn(buttonVariants({ className: "w-fit bg-brand" }))}
        >
          {t("products_section_button")}
          <ArrowUpRight />
        </Link>
      </div>
      <ul className="col-span-2 flex touch-pan-x snap-x snap-proximity items-stretch gap-6 overflow-x-auto">
        {categories.map((category) => (
          <li
            key={category.id}
            className="shrink-0 basis-3/4 snap-start sm:basis-[calc(50%_-_60px)]"
          >
            <Category category={category} />
          </li>
        ))}
      </ul>
    </section>
  );
}

async function ArticlesSection() {
  const t = await getTranslations("HomePage");
  const articles = await db
    .select()
    .from(articlesTable)
    .orderBy(desc(articlesTable.createdAt))
    .limit(3);

  return (
    <section className="container grid grid-cols-1 py-6 sm:py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2> {t("articles_latest")}</h2>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <li key={article.id}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </section>
  );
}
