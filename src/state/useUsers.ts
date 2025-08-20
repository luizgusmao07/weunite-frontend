import type { UpdateUser } from "@/@types/user.types";
import { updateUser } from "@/api/services/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/useAuthStore";
import { postKeys } from "./usePosts";
import { commentKeys } from "./useComments";

export const profileKeys = {
  all: ["profiles"] as const,
  lists: () => [...profileKeys.all, "list"] as const,
  listByUser: (userId: number) => [...profileKeys.lists(), { userId }] as const,
  listByPostId: (postId: number) =>
    [...profileKeys.lists(), { postId }] as const,
  detailByUsername: (username: String) =>
    [...profileKeys.all, "detail", username] as const,
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = useAuthStore();

  return useMutation({
    mutationFn: ({
      data,
      username,
    }: {
      data: UpdateUser;
      username: string;
    }) => {
      return updateUser(data, username);
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || "Perfil atualizado com sucesso!");

        if (user && result.data?.data) {
          setUser({
            ...user,
            name: result.data.data.name || user.name,
            username: result.data.data.username || user.username,
            profileImg: result.data.data.profileImg || user.profileImg,
          });
        }

        queryClient.invalidateQueries({
          queryKey: profileKeys.listByUser(result.data.data.userId),
        });
        queryClient.invalidateQueries({ queryKey: postKeys.lists() });
        queryClient.invalidateQueries({ queryKey: commentKeys.lists() });

        console.log("=== QUERIES INVALIDADAS ===");
      } else {
        toast.error(result?.error || "Erro ao atualizar perfil");
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Erro inesperado ao atualizar perfil";
      toast.error(errorMessage);
    },
  });
};
