import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateComment } from "@/@types/comment.types";
import {
  createCommentRequest,
  getCommentsPostRequest,
  getCommentsUserId,
} from "@/api/services/commentService";
import { toast } from "sonner";

export const commentKeys = {
  all: ["comments"] as const,
  lists: () => [...commentKeys.all, "list"] as const,
  list: (filters: string) => [...commentKeys.lists(), { filters }] as const,
  details: () => [...commentKeys.all, "detail"] as const,
  detail: (id: string) => [...commentKeys.details(), id] as const,
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      userId,
      postId,
    }: {
      data: CreateComment;
      userId: number;
      postId: number;
    }) => createCommentRequest(data, userId, postId),
    onSuccess: (result, { postId }) => {
      if (result.success) {
        toast.success(result.message || "Comentário criado com sucesso!");

        queryClient.invalidateQueries({
          queryKey: [commentKeys.lists(), postId],
        });
      } else {
        toast.error(result.message || "Erro ao criar comentário.");
      }
    },

    onError: () => {
      toast.error("Erro inesperado ao criar comentário.");
    },
  });
};

export const useGetComments = (postId: number) => {
  return useQuery({
    queryKey: [commentKeys.lists(), postId],
    queryFn: () => getCommentsPostRequest(postId),
    staleTime: 5 * 60 * 1000,
    enabled: !!postId,
  });
};
export const useGetCommentsByUserId = (userId: number) => {
  return useQuery({
    queryKey: [commentKeys.lists(), userId],
    queryFn: () => getCommentsUserId(userId),
    staleTime: 5 * 60 * 1000,
    enabled: !!userId,
  });
};
