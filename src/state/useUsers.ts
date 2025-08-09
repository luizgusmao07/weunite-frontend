import type { UpdateUser } from "@/@types/user.types";
import {
  updateUser,
} from "@/api/services/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const profileKeys = {
    all: ["profiles"] as const,
    lists: () => [...profileKeys.all, "list"] as const,
    list: (filters: string) => [...profileKeys.lists(), { filters }] as const,
    details: () => [...profileKeys.all, "detail"] as const,
    detail: (id: string) => [...profileKeys.details(), id] as const,
}

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            data,
            username,
        }: {
            data: UpdateUser;
            username: string;
        }) => updateUser(data, username),
        onSuccess: (result) => {
            if (result.success) {
                toast.success(result.message || "Perfil atualizado com sucesso!");

                queryClient.invalidateQueries({ queryKey: profileKeys.lists() });
            } else {
                toast.error(result.message || "Erro ao atualizar perfil");
            }
        },
        onError: () => {
            toast.error("Erro inesperado ao atualizar perfil");
        },
    });
};