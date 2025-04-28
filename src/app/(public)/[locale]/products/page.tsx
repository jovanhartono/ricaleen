import { ProductCard } from "@/app/(public)/[locale]/products/product-card";
import { Link } from "@/i18n/navigation";
import { getCategories, getProducts, type ProductDTO } from "@/service/admin";
import { LANGUAGE } from "@/types/enum";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [t, locale, products, categories] = await Promise.all([
    getTranslations("Product"),
    getLocale(),
    getProducts(),
    getCategories(),
  ]);

  const productsGroupByCategory = products.reduce(
    (acc, curr) => {
      const categoryName =
        locale === "id" ? curr.categoryNameId : curr.categoryNameEn;
      if (!acc[categoryName!]) {
        acc[categoryName!] = [];
      }
      acc[categoryName!].push(curr);
      return acc;
    },
    {} as Record<string, ProductDTO[]>,
  );

  const filteredEntries = category
    ? Object.entries(productsGroupByCategory).filter(([_, products]) =>
        products.every((product) => product.categorySlug === category),
      )
    : // get the first category if category searchParams is undefined
      [Object.entries(productsGroupByCategory)[0]];

  return (
    <main className="flex flex-col">
      <section className="py-6 sm:py-12">
        <div className="container flex">
          <h1>{t("title")}</h1>
        </div>
      </section>
      <section className="container pb-6 sm:pb-9">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6">
          {categories.map((category) => (
            <li key={category.id} className="cursor-pointer">
              <Link scroll={false} prefetch href={`?category=${category.slug}`}>
                <figure className="space-y-3">
                  <Image
                    width={300}
                    height={300}
                    draggable="false"
                    className="aspect-square rounded"
                    src={category.thumbnail}
                    alt={category.slug}
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <figcaption className="font-semibold text-brand">
                    {locale === LANGUAGE.ID
                      ? category.name_id
                      : category.name_en}
                  </figcaption>
                </figure>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="container space-y-9 pb-6 sm:pb-12">
        {filteredEntries.length === 0 ? (
          <p>No products found for this category.</p>
        ) : (
          filteredEntries.map(([categoryName, products], index) => (
            <div key={index} className="space-y-6">
              <div className="flex h-12 items-center rounded bg-brand px-4 sm:h-16">
                <p className="text-lg font-semibold text-brand-foreground sm:text-xl">
                  {categoryName}
                </p>
              </div>
              <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                {products.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
