import type {
  Conversation,
  CreateConversation,
  Message,
} from "@/@types/chat.types";
import { instance as axios } from "../axios";
import { AxiosError } from "axios";

export const createConversationRequest = async (data: CreateConversation) => {
  try {
    const response = await axios.post("/conversations/create", data);

    return {
      success: true,
      data: response.data as Conversation,
      message: "Conversa criada com sucesso!",
      error: null,
    };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    return {
      success: false,
      data: null,
      message: null,
      error: error.response?.data?.message || "Erro ao criar conversa",
    };
  }
};

export const getUserConversationsRequest = async (userId: number) => {
  try {
    const response = await axios.get(`/conversations/user/${userId}`);

    return {
      success: true,
      data: response.data as Conversation[],
      message: "Conversas carregadas com sucesso!",
      error: null,
    };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    return {
      success: false,
      data: null,
      message: null,
      error: error.response?.data?.message || "Erro ao carregar conversas",
    };
  }
};

export const getConversationByIdRequest = async (
  conversationId: number,
  userId: number,
) => {
  try {
    const response = await axios.get(
      `/conversations/${conversationId}/user/${userId}`,
    );

    return {
      success: true,
      data: response.data as Conversation,
      message: "Conversa carregada com sucesso!",
      error: null,
    };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    return {
      success: false,
      data: null,
      message: null,
      error: error.response?.data?.message || "Erro ao carregar conversa",
    };
  }
};

export const getConversationMessagesRequest = async (
  conversationId: number,
  userId: number,
) => {
  try {
    const response = await axios.get(
      `/conversations/${conversationId}/messages/${userId}`,
    );

    return {
      success: true,
      data: response.data as Message[],
      message: "Mensagens carregadas com sucesso!",
      error: null,
    };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    return {
      success: false,
      data: null,
      message: null,
      error: error.response?.data?.message || "Erro ao carregar mensagens",
    };
  }
};

export const markMessagesAsReadRequest = async (
  conversationId: number,
  userId: number,
) => {
  try {
    await axios.put(`/conversations/${conversationId}/read/${userId}`);

    return {
      success: true,
      data: null,
      message: "Mensagens marcadas como lidas!",
      error: null,
    };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    return {
      success: false,
      data: null,
      message: null,
      error:
        error.response?.data?.message || "Erro ao marcar mensagens como lidas",
    };
  }
};
