import type {
    CreatePost,
    UpdatePost,
    GetPost,
    DeletePost
} from "@/@types/post.types";
import { instance as axios } from "../axios";
import { AxiosError } from "axios";

export const createPostRequest = async (data: CreatePost) => {
    try {
        const response = await axios.post("/post/create", data);
        return {
            success: true,
            data: response.data,
            message: response.data.message || "Publicação criada com sucesso!",
            error: null
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
}

export const updatePostRequest = async (data: UpdatePost) => {
    try {
        const response = await axios.post("/post/update", data);
        return {
            success: true,
            data: response.data,
            message: response.data.message || "Publicação atualizada com sucesso!",
            error: null
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
}

export const getPostRequest = async (data: GetPost) => {
    try {
        const response = await axios.post(`/post/get/${data}`,);
        return {
            success: true,
            data: response.data,
            message: response.data.message || "Publicação consultada com sucesso!",
            error: null
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
}

export const deletePostRequest = async (data: DeletePost) => {
    try {
        const response = await axios.post(`/post/delete/${data}`,);
        return {
            success: true,
            data: response.data,
            message: response.data.message || "Publicação deletar com sucesso!",
            error: null
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
}