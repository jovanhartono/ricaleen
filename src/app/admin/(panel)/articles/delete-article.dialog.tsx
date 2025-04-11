"use client";

import { useModal } from "@/app/providers";
import { Button } from "@/components/ui/button";
import { deleteArticle } from "@/service/admin";
import { useMutation } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DeleteArticleDialog({ id }: { id: number }) {
  const { refresh } = useRouter();
  const { openModal, closeModal } = useModal();

  const deleteMutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess() {
      closeModal();
      refresh();
      toast.success("Article deleted successfully");
    },
  });

  return (
    <Button
      variant="destructive"
      size="icon"
      disabled={deleteMutation.isPending}
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
      <Trash2Icon />
    </Button>
  );
}
