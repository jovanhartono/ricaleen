import { ArticleCard } from "@/app/(public)/[locale]/articles/article-card";
import { db } from "@/db";
import { articlesTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import {
  BlocksIcon,
  ChartNoAxesColumnIncreasing,
  DatabaseIcon,
  GlobeIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
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
      <section className="flex flex-col gap-y-6">
        <div className="container py-6 sm:py-12">
          <h1>{t("hero_title")}</h1>
          <h2 className="mt-4 text-xl font-medium text-pretty">
            {t("hero_description")}
          </h2>
        </div>
        <div className="relative h-[500px] md:h-[600px]">
          <div className="absolute inset-0 z-10 bg-foreground/10" />
          <Image
            fill
            src="https://yd1jimsuwvzgnhbn.public.blob.vercel-storage.com/metal-background-zAOcVwubhjrejTz0v647jTiV0I4TVe.jpg"
            alt="hero background"
            className="h-[600px] object-cover object-center"
          />
        </div>
      </section>

      <section id="about" className="container space-y-12 py-6 md:py-12">
        <h2>
          {t("about_title")}
          <br />
          <span className="font-normal">{t("about_extended_title")}</span>
        </h2>
        <div className="grid md:grid-cols-[minmax(400px,_40%)_60%] md:gap-x-0">
          <div className="relative z-10 self-center rounded bg-brand px-6 py-8 *:text-balance [&_>p]:mb-4 [&_>p]:text-primary-foreground/90 max-sm:[&>_p]:text-sm">
            <h3 className="mb-6 text-2xl font-medium text-primary-foreground">
              {t("about_second_title")}
            </h3>
            <p>{t("about_first_description")}</p>
            <p>{t("about_second_description")}</p>
            <p>{t("about_third_description")}</p>
          </div>
          <div className="relative h-[400px] md:-ml-[15%] md:h-[550px]">
            <Image
              src="https://yd1jimsuwvzgnhbn.public.blob.vercel-storage.com/scrap-metal-44fSdxBR7zbyVZCNuhz0a5QWToYYnr.webp"
              alt="Company history"
              fill
              className="rounded object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section
        id="services"
        className="flex flex-col gap-8 bg-[#dfe3ed] px-4 py-8 sm:gap-16 sm:py-16"
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
        <ArticlesSection />
      </Suspense>
    </main>
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
