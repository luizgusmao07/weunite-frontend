import type { CreateComment } from "@/@types/comment.types";
import { instance as axios } from "../axios";
import { AxiosError } from "axios";

export const createCommentRequest = async (
  data: CreateComment,
  userId: number,
  postId: number,
) => {
  try {
    const response = await axios.post(
      `/comment/create?userId=${userId}&postId=${postId}`,
      {
        text: data.text,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return {
      success: true,
      data: response.data,
      message: response.data.message || "Comentário criado com sucesso",
      error: null,
    };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      success: false,
      data: null,
      message: error.response?.data.message || "Erro ao criar comentário",
      error: error,
    };
  }
};

export const getCommentsPostRequest = async (postId: number) => {
  try {
    const response = await axios.get(`/comment/get/${postId}`);

    return {
      success: true,
      data: response.data,
      message: response.data.message || "Comentários consultados com sucesso!",
      error: null,
    };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    return {
      success: false,
      data: null,
      message: null,
      error: error.response?.data?.message || "Erro ao consultar comentários",
    };
  }
};

export const getCommentsUserId = async (userId: number) => {
  try {
    const response = await axios.get(`/comment/get/user/${userId}`);

    return {
      success: true,
      data: response.data,
      message:
        response.data.message ||
        "Comentários do usuário consultados com sucesso!",
      error: null,
    };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    return {
      success: false,
      data: null,
      message: null,
      error:
        error.response?.data?.message ||
        "Erro ao consultar comentários do usuário",
    };
  }
};
