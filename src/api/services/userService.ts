import type {
  UpdateUser,
} from "@/@types/user.types";
import { instance as axios } from "../axios";
import { AxiosError } from "axios";

export const updateUser = async (
    data: UpdateUser, 
    username: string,
) => {
    try {
        const formData = new FormData();

        const postBlob = new Blob([JSON.stringify({
             name: data.name, 
             username: data.username, 
             email: data.email 
            })], {
            type: "application/json",
        });

        formData.append("user", postBlob);

        if (data.profileImg) {
            formData.append("image", data.profileImg)
        }
        
        const response = await axios.put(
            `/user/update/${username}`,
            formData
        );

        return {
            success: true,
            data: response.data,
            message: response.data.message || "Perfil atualizado com sucesso!",
            error: null,
        };
    
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;

        return {
            success: false,
            data: null,
            message: null,
            error: error.response?.data?.message || "Erro ao atualizar perfil",
        };
    }
};