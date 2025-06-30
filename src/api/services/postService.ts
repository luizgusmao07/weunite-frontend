import type {
  CreatePost,
  UpdatePost,
  GetPost,
  DeletePost,
} from "@/@types/post.types";
import { instance as axios } from "../axios";
import { AxiosError } from "axios";

export const createPostRequest = async (data: CreatePost, userId: number) => {
  try {
    const formData = new FormData();

    const postBlob = new Blob([JSON.stringify({ text: data.text })], {
      type: "application/json",
    });

    formData.append("post", postBlob);

    if (data.media) {
      formData.append("image", data.media);
    }

    const response = await axios.post(`/posts/create/${userId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });

    return {
      success: true,
      data: response.data,
      message: response.data.message || "Publicação criada com sucesso!",
      error: null,
    };
    
  } catch (err) {

    const error = err as AxiosError<{ message: string }>;

    return {
      success: false,
      data: null,
      message: null,
      error: error.response?.data?.message || "Erro ao criar publicação",
    };

  }
};

export const updatePostRequest = async (data: UpdatePost, userId: number, postId: number) => {
  try {
    const response = await axios.post(`/post/update/${userId}/${postId}`, data);
    return {
      success: true,
      data: response.data,
      message: response.data.message || "Publicação atualizada com sucesso!",
      error: null,
    };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      success: false,
      data: null,
      message: null,
      error: error.response?.data?.message || "Erro ao atualizar publicação",
    };
  }
};

export const getPostRequest = async (data: GetPost) => {
  try {
    const response = await axios.post(`/post/get/${data}`);
    return {
      success: true,
      data: response.data,
      message: response.data.message || "Publicação consultada com sucesso!",
      error: null,
    };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      success: false,
      data: null,
      message: null,
      error: error.response?.data?.message || "Erro ao consultar publicação",
    };
  }
};

export const getPostsRequest = async () => {
  try {
    const response = await axios.get(`/posts/get`);
    return {
      success: true,
      data: response.data,
      message: response.data.message || "Publicações consultadas com sucesso!",
      error: null,
    };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      success: false,
      data: null,
      message: null,
      error: error.response?.data?.message || "Erro ao consultar publicações",
    };
  }
};

export const deletePostRequest = async (data: DeletePost) => {
  try {
    const response = await axios.post(`/post/delete/${data}`);
    return {
      success: true,
      data: response.data,
      message: response.data.message || "Publicação deletar com sucesso!",
      error: null,
    };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      success: false,
      data: null,
      message: null,
      error: error.response?.data?.message || "Erro ao deletar publicação",
    };
  }
};
