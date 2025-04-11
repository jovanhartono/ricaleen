"use client";

import { DataTable } from "@/components/ui/data-table";
import { getArticles, type ArticleDTO } from "@/service/admin";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import dayjs from "dayjs";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ArticleDetailDialog } from "@/app/admin/(panel)/articles/article-detail-dialog";
import { EditArticleDialog } from "@/app/admin/(panel)/articles/edit-article-dialog";
import { DeleteArticleDialog } from "@/app/admin/(panel)/articles/delete-article.dialog";

const columnHelper = createColumnHelper<ArticleDTO>();
const columns = [
  columnHelper.accessor("titleId", {
    header: "Title ID",
    cell: ({ getValue, row }) => (
      <Dialog>
        <DialogTrigger className="font-semibold">{getValue()}</DialogTrigger>
        <ArticleDetailDialog article={row.original} />
      </Dialog>
    ),
  }),
  columnHelper.accessor("titleEn", {
    header: "Title EN",
    cell: ({ getValue, row }) => (
      <Link
        prefetch
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
  columnHelper.display({
    id: "action",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <EditArticleDialog article={row.original} />
        <DeleteArticleDialog id={row.original.id} />
      </div>
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
