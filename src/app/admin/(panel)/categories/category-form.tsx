import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUploadThumbnail } from "@/hooks/useUploadThumbnail";
import type { CategoryForm as CategoryFormType } from "@/lib/schema/category";
import { cn } from "@/lib/utils";
import { deleteThumbnail } from "@/service/admin";
import { ImageIcon, LoaderIcon } from "lucide-react";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";

export function CategoryForm({
  handleOnSubmit,
}: {
  handleOnSubmit: (category: CategoryFormType) => void;
}) {
  const form = useFormContext<CategoryFormType>();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const uploadThumbnail = useUploadThumbnail({
    onSuccess: (url) => {
      form.setValue("thumbnail", url);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const thumbnail = form.getValues("thumbnail");
    if (thumbnail) {
      deleteThumbnail(thumbnail);
    }

    const file = e.target.files?.[0];
    if (!file) return;

    uploadThumbnail.mutate(file);
  };

  return (
    <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <div
          className={cn(
            "relative flex h-40 cursor-pointer items-center justify-center rounded-md border-2 border-dashed transition-colors hover:bg-muted/50",
            {
              "pointer-events-none bg-muted": uploadThumbnail.isPending,
            },
          )}
          onClick={triggerFileInput}
        >
          {uploadThumbnail.isPending && (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoaderIcon className="size-6 animate-spin" />
            </div>
          )}
          <input
            type="file"
            id="thumbnail"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          {form.watch("thumbnail") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="h-full w-full object-contain p-2"
              src={form.watch("thumbnail")!}
              alt="Category thumbnail preview"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ImageIcon className="h-10 w-10" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-medium">Click to upload</span>
                <span className="text-xs">SVG, PNG, JPG or GIF (max. 2MB)</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <FormField
        control={form.control}
        name="name_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name ID</FormLabel>
            <FormControl>
              <Input placeholder="Enter category name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="name_en"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name EN</FormLabel>
            <FormControl>
              <Input placeholder="Enter category name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter category description"
                rows={3}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <DialogFooter>
        <DialogClose asChild>
          <Button ref={closeButtonRef} type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" loading={form.formState.isSubmitting}>
          Save Category
        </Button>
      </DialogFooter>
    </form>
  );
}
