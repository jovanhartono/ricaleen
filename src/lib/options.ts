import { getArticles } from "@/service/admin";
import { queryOptions } from "@tanstack/react-query";

export const articleOptions = queryOptions({
  queryKey: ["articles"],
  queryFn: getArticles,
});
