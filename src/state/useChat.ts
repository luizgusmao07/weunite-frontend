import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateConversation } from "@/@types/chat.types";
import {
  createConversationRequest,
  getConversationByIdRequest,
  getConversationMessagesRequest,
  getUserConversationsRequest,
  markMessagesAsReadRequest,
} from "@/api/services/chatService";
import { toast } from "sonner";

export const chatKeys = {
  all: ["chat"] as const,
  conversations: () => [...chatKeys.all, "conversations"] as const,
  conversationsByUser: (userId: number) =>
    [...chatKeys.conversations(), "user", userId] as const,
  conversationDetail: (conversationId: number, userId: number) =>
    [...chatKeys.conversations(), "detail", conversationId, userId] as const,
  messages: () => [...chatKeys.all, "messages"] as const,
  messagesByConversation: (conversationId: number, userId: number) =>
    [...chatKeys.messages(), "conversation", conversationId, userId] as const,
};

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateConversation) => createConversationRequest(data),
    onSuccess: (result, variables) => {
      if (result.success) {
        toast.success(result.message || "Conversa criada com sucesso!");

        variables.participantIds.forEach((userId) => {
          queryClient.invalidateQueries({
            queryKey: chatKeys.conversationsByUser(userId),
          });
        });
      } else {
        toast.error(result.error || "Erro ao criar conversa");
      }
    },
    onError: () => {
      toast.error("Erro inesperado ao criar conversa");
    },
  });
};

export const useGetUserConversations = (userId: number) => {
  return useQuery({
    queryKey: chatKeys.conversationsByUser(userId),
    queryFn: () => getUserConversationsRequest(userId),
    staleTime: 5000,
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!userId,
  });
};

export const useGetConversationById = (
  conversationId: number,
  userId: number,
) => {
  return useQuery({
    queryKey: chatKeys.conversationDetail(conversationId, userId),
    queryFn: () => getConversationByIdRequest(conversationId, userId),
    staleTime: 30 * 1000,
    retry: 2,
    enabled: !!conversationId && !!userId,
  });
};

export const useGetConversationMessages = (
  conversationId: number,
  userId: number,
) => {
  return useQuery({
    queryKey: chatKeys.messagesByConversation(conversationId, userId),
    queryFn: () => getConversationMessagesRequest(conversationId, userId),
    staleTime: 5 * 60 * 1000, // 5 minutos - confiar no WebSocket
    refetchOnWindowFocus: false, // Não refetch ao focar janela
    refetchOnMount: false, // Não refetch ao montar
    refetchOnReconnect: true, // Apenas ao reconectar internet
    retry: 2,
    enabled: !!conversationId && !!userId,
  });
};

export const useMarkMessagesAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      userId,
    }: {
      conversationId: number;
      userId: number;
    }) => markMessagesAsReadRequest(conversationId, userId),
    onSuccess: (result, { conversationId, userId }) => {
      if (result.success) {
        queryClient.invalidateQueries({
          queryKey: chatKeys.messagesByConversation(conversationId, userId),
        });

        queryClient.invalidateQueries({
          queryKey: chatKeys.conversationsByUser(userId),
        });

        queryClient.invalidateQueries({
          queryKey: chatKeys.conversationDetail(conversationId, userId),
        });
      }
    },
  });
};
