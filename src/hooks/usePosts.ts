import { createPostRequest } from "@/api/services/postService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (filters: string) => [...postKeys.lists(), { filters }] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostRequest,
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || "Publicação criada com sucesso!");

        queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      } else {
        toast.error(result.message || "Erro ao criar publicação");
      }
    },
    onError: () => {
      toast.error("Erro inesperado ao criar postagem");
    },
  });
};
