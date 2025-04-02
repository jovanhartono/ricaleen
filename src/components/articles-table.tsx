"use client";

import { DataTable } from "@/components/ui/data-table";
import { getArticles } from "@/service/admin";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import dayjs from "dayjs";

type ArticleDTO = Awaited<ReturnType<typeof getArticles>>[number];
const columnHelper = createColumnHelper<ArticleDTO>();
const columns = [
  columnHelper.accessor("titleId", {
    header: "Title ID",
    cell: ({ getValue, row }) => (
      <Link
        href={`/admin/articles/${row.original.id}`}
        className="font-semibold"
      >
        {getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor("titleEn", {
    header: "Title EN",
    cell: ({ getValue, row }) => (
      <Link
        href={`/admin/articles/${row.original.id}`}
        className="font-semibold"
      >
        {getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: ({ getValue }) => (
      <div>{dayjs(getValue()).format("DD MMMM YYYY")}</div>
    ),
  }),
];

export function ArticlesTable() {
  const { data: articles } = useSuspenseQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });

  return (
    <div>
      <DataTable columns={columns} data={articles} />
    </div>
  );
}
