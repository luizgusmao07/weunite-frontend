import type { ToggleLike } from "@/@types/like.types";
import { toggleLikeRequest } from "@/api/services/likeService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postKeys } from "./usePosts";
import { toast } from "sonner";

export const likeKeys = {
  all: ["likes"] as const,
  lists: () => [...likeKeys.all, "list"] as const,
  list: (filters: string) => [...likeKeys.lists(), { filters }] as const,
  details: () => [...likeKeys.all, "detail"] as const,
  detail: (id: string) => [...likeKeys.details(), id] as const,
};

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ToggleLike) => toggleLikeRequest(data),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || "Like atualizado com sucesso!");
        
        queryClient.invalidateQueries({ queryKey: postKeys.lists() });

        queryClient.invalidateQueries({ queryKey: likeKeys.lists() });
      } else {
        toast.error(result.error || "Erro ao atualizar like");
      }
    },
    onError: () => {
      toast.error("Erro inesperado ao atualizar like");
    },
  });
};
