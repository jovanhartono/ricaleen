"use client";

import { useModal } from "@/app/providers";
import { cn } from "@/lib/utils";
import { deleteArticle } from "@/service/admin";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function DeleteArticleDialog({ id }: { id: number }) {
  const { openModal, closeModal } = useModal();

  const deleteMutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess() {
      closeModal();
      toast.success("Article deleted successfully");
    },
  });

  return (
    <span
      className={cn("cursor-pointer text-destructive", {
        "pointer-events-none": deleteMutation.isPending,
      })}
      onClick={() => {
        openModal({
          title: "Delete Article",
          description:
            "Are you sure you want to delete this article? This action cannot be undone.",
          onConfirm: async () => {
            deleteMutation.mutate(id);
          },
        });
      }}
    >
      Delete
    </span>
  );
}
