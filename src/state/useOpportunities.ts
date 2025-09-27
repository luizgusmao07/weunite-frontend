import type { CreateOpportunity } from "@/@types/opportunity.types";
import {
  createOpportunityRequest,
  getOpportunitiesRequest,
} from "@/api/services/opportunityService-new";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const opportunityKeys = {
  all: ["opportunities"] as const,
  lists: () => [...opportunityKeys.all, "list"] as const,
  list: (filters: string) => [...opportunityKeys.lists(), { filters }] as const,
  details: () => [...opportunityKeys.all, "detail"] as const,
  detail: (id: string) => [...opportunityKeys.details(), id] as const,
};

export const useGetOpportunities = () => {
  return useQuery({
    queryKey: opportunityKeys.lists(),
    queryFn: getOpportunitiesRequest,
    select: (data) => {
      if (data.success) {
        return data.data;
      }
      return [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useCreateOpportunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      companyId,
    }: {
      data: CreateOpportunity;
      companyId: number;
    }) => createOpportunityRequest(data, companyId),
    onSuccess: (result) => {
      console.log("🎉 useCreateOpportunity - onSuccess chamado com:", result);
      toast.success("Oportunidade criada com sucesso!");
      // Força invalidação e refetch
      queryClient.invalidateQueries({ queryKey: opportunityKeys.lists() });
      queryClient.refetchQueries({ queryKey: opportunityKeys.lists() });
    },
    onSettled: () => {
      // Garantir que sempre invalide as queries, independente do resultado
      console.log("🔄 Invalidando queries no onSettled");
      queryClient.invalidateQueries({ queryKey: opportunityKeys.lists() });
      queryClient.refetchQueries({ queryKey: opportunityKeys.lists() });
    },
    onError: (error) => {
      console.error("❌ useCreateOpportunity - onError chamado com:", error);
      // Verificar se o erro é realmente um erro ou apenas problema de parsing
      if (
        error.message &&
        (error.message.includes("201") || error.message.includes("Created"))
      ) {
        console.log("✅ Erro é na verdade sucesso (status 201)");
        toast.success("Oportunidade criada com sucesso!");
        queryClient.invalidateQueries({ queryKey: opportunityKeys.lists() });
      } else {
        toast.error("Erro inesperado ao criar oportunidade");
      }
    },
  });
};
