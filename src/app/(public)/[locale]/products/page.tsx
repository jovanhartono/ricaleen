import { ProductCard } from "@/app/(public)/[locale]/products/product-card";
import { getProducts, type ProductDTO } from "@/service/admin";

export default async function ProductsPage() {
  const products = await getProducts();

  const productsGroupByCategory = products.reduce(
    (acc, curr) => {
      if (!acc[curr.categoryName!]) {
        acc[curr.categoryName!] = [];
      }

      acc[curr.categoryName!].push(curr);

      return acc;
    },
    {} as Record<string, ProductDTO[]>,
  );

  //get by category first...
  return (
    <main className="flex flex-col">
      <section className="py-6 sm:py-12">
        <div className="container flex">
          <h1>Explore Our Diverse Non-Ferrous Metal Portfolio</h1>
        </div>
      </section>
      <section className="container pb-6 sm:pb-12">
        {Object.entries(productsGroupByCategory).map(
          ([category, products], index) => (
            <div key={index} className="space-y-6">
              <p className="text-lg font-semibold text-black">{category}</p>

              <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                {products.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            </div>
          ),
        )}
      </section>
    </main>
  );
}
