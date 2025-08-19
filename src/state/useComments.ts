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
  listByPost: (postId: number) => [...commentKeys.lists(), { postId }] as const,
  listByUser: (userId: number) => [...commentKeys.lists(), { userId }] as const,
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
    onSuccess: (result, { postId, userId }) => {
      if (result.success) {
        toast.success(result.message || "Comentário criado com sucesso!");

        queryClient.invalidateQueries({
          queryKey: commentKeys.listByPost(postId),
        });

        queryClient.invalidateQueries({
          queryKey: commentKeys.listByUser(userId),
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
    queryKey: commentKeys.listByPost(postId),
    queryFn: () => getCommentsPostRequest(postId),
    staleTime: 5 * 60 * 1000,
    enabled: !!postId,
  });
};
export const useGetCommentsByUserId = (userId: number) => {
  return useQuery({
    queryKey: commentKeys.listByUser(userId),
    queryFn: () => getCommentsUserId(userId),
    staleTime: 5 * 60 * 1000,
    enabled: !!userId,
  });
};
