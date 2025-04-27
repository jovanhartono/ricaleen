import { AddCategoryDialog } from "@/app/admin/(panel)/categories/add-category-dialog";
import { EditCategoryDialog } from "@/app/admin/(panel)/categories/edit-category-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { db } from "@/db";
import { categoriesTable, productsTable } from "@/db/schema";
import { count, eq, getTableColumns } from "drizzle-orm";
import { Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";

export default async function AdminCategoryPage() {
  const categories = await db
    .select({
      ...getTableColumns(categoriesTable),
      productCount: count(productsTable.id),
    })
    .from(categoriesTable)
    .leftJoin(productsTable, eq(categoriesTable.id, productsTable.categoryId))
    .groupBy(categoriesTable.id);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <AddCategoryDialog />
        </Dialog>
      </div>

      <div className="grid gap-6">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>
                  {category.name_id} / {category.name_en}
                </CardTitle>
                <Dialog>
                  <DialogTrigger className="flex cursor-pointer items-center">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DialogTrigger>
                  <EditCategoryDialog category={category} />
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                {category.thumbnail && (
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={category.thumbnail || "/placeholder.svg"}
                      alt={`${category.name_en} thumbnail`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-between">
                  <p className="mb-2 text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  <p className="text-sm font-medium">
                    {category.productCount} products
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="py-10 text-center">
          <p className="mb-4 text-muted-foreground">No categories found</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add your first category
              </Button>
            </DialogTrigger>
            <AddCategoryDialog />
          </Dialog>
        </div>
      )}
    </div>
  );
}
