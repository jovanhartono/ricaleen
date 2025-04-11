import { getArticles, getCategories, getProducts } from "@/service/admin";
import { queryOptions } from "@tanstack/react-query";

export const articleOptions = queryOptions({
  queryKey: ["articles"],
  queryFn: getArticles,
});

export const categoriesOptions = queryOptions({
  queryKey: ["categories"],
  queryFn: getCategories,
});

export const productsOptions = queryOptions({
  queryKey: ["products"],
  queryFn: getProducts,
});
