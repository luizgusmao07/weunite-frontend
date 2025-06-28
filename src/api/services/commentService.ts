import type {
    CreateComment
} from "@/@types/comment.types";
import { instance as axios } from "../axios";
import { AxiosError } from "axios";

export const createCommentRequest = async (data: CreateComment) => {
    try {
        const response = await axios.post("/comment/create", data);
        return {
            success: true,
            data: response.data,
            message: response.data.message || "Comentário criado com sucesso",
            error: null
        };
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        return {
            success: false,
            data: null,
            message: error.response?.data.message || "Erro ao criar comentário",
            error: error
        };
    }
}