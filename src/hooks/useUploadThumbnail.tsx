import { useMutation } from "@tanstack/react-query";
import { upload } from "@vercel/blob/client";
import { toast } from "sonner";

export function useUploadThumbnail({
  onSuccess,
}: {
  onSuccess?: (url: string) => void;
}) {
  return useMutation({
    mutationFn: async (file: File) => {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/thumbnail/upload",
      });
      return blob.url;
    },
    onSuccess: (url: string) => {
      // form.setValue("thumbnail", url);
      toast.success("Thumbnail uploaded successfully");
      onSuccess?.(url);
    },
    onError: (error) => {
      toast.error("Failed to upload thumbnail");
      console.error(error);
    },
  });
}
