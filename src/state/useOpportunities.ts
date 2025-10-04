import type { CreateOpportunity } from "@/@types/opportunity.types";
import {
  createOpportunityRequest,
  getOpportunitiesRequest,
} from "@/api/services/opportunityService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const opportunityKeys = {
  all: ["opportunities"] as const,
  lists: () => [...opportunityKeys.all, "list"] as const,
  list: (filters: string) => [...opportunityKeys.lists(), { filters }] as const,
  details: () => [...opportunityKeys.all, "detail"] as const,
  detail: (id: string) => [...opportunityKeys.details(), id] as const,
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
      if (result.success) {
        toast.success(result.message || "Oportunidade criada com sucesso!");
        console.log("CRIAÇÃO DE OPORTUNIDADE");
        console.log(result.data);
        console.log(result.data.company);

        queryClient.invalidateQueries({ queryKey: opportunityKeys.lists() });
      } else {
        toast.error(result.message || "Erro ao criar oportunidade");
      }
    },
    onError: () => {
      toast.error("Erro inesperado ao criar oportunidade");
    },
  });
};

export const useGetOpportunities = () => {
  return useQuery({
    queryKey: opportunityKeys.lists(),
    queryFn: getOpportunitiesRequest,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};
