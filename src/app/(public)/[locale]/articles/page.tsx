import { ArticleCard } from "@/app/(public)/[locale]/articles/article-card";
import { getArticles } from "@/service/admin";
import Image from "next/image";

export default async function ArticlesPage() {
  // const t = await getTranslations("ArticlePage");
  const articles = await getArticles();

  return (
    <main className="flex flex-col">
      <section className="relative flex h-[400px] items-center sm:h-[500px]">
        <Image
          fill
          priority
          src="https://yd1jimsuwvzgnhbn.public.blob.vercel-storage.com/articles-bg-LtxanYewOEEPtBhxwo847A0dgBScGj.webp"
          alt="Articles background"
          className="object-cover object-center brightness-40"
          sizes="100vw"
        />
        <div className="relative z-20 container *:text-brand-foreground">
          <h1 className="text-brand-foreground">Our Company Articles</h1>
        </div>
      </section>

      <section className="container py-12">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </ul>
      </section>
    </main>
  );
}
