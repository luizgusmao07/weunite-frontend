import type { UpdateUser } from "@/@types/user.types";
import { updateUser } from "@/api/services/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/useAuthStore"; // Importar o useAuthStore

export const profileKeys = {
  all: ["profiles"] as const,
  lists: () => [...profileKeys.all, "list"] as const,
  list: (filters: string) => [...profileKeys.lists(), { filters }] as const,
  details: () => [...profileKeys.all, "detail"] as const,
  detail: (id: string) => [...profileKeys.details(), id] as const,
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = useAuthStore(); // Obter o usuário atual e a função para atualizá-lo

  return useMutation({
    mutationFn: ({ data, username }: { data: UpdateUser; username: string }) => {
      console.log("Dados a serem enviados:", data, "Username:", username);
      return updateUser(data, username);
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || "Perfil atualizado com sucesso!");

        // Atualizar o usuário no localStorage
        if (user && result.data?.data) {
          // Mesclando os dados atuais do usuário com os novos dados retornados
          setUser({
            ...user,
            name: result.data.data.name || user.name,
            username: result.data.data.username || user.username,
            email: result.data.data.email || user.email,
            profileImg: result.data.data.profileImg || user.profileImg,
          });
        }

        queryClient.invalidateQueries({ queryKey: profileKeys.lists() });
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

