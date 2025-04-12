import { AddArticleDialog } from "@/app/admin/(panel)/articles/add-article-dialog";
import { ArticleCard } from "@/app/admin/(panel)/articles/article-card";
import { getArticles } from "@/service/admin";

export default async function AdminArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Articles</h1>
        <AddArticleDialog />
      </div>

      {articles.length ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-4">
          {articles.map((article) => (
            <li key={article.id}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">
          No articles found. Create one to get started.
        </p>
      )}
    </div>
  );
}
