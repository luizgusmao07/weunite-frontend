import type { ToggleLike } from "@/@types/like.types";
import { instance as axios } from "../axios";
import { AxiosError } from "axios";

export const toggleLikeRequest = async (data: ToggleLike) => {
  try {
    const response = await axios.post(
      `/likes/toggleLike/${data.userId}/${data.postId}`,
    );
    return {
      success: true,
      data: response.data,
      message: response.data.message,
      error: null,
    };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      success: false,
      data: null,
      message: null,
      error: error.response?.data?.message,
    };
  }
};

export const toggleLikeRequestComment = async (data: ToggleLike) => {
  try {
    const response = await axios.post(
      `/likes/toggleLikeComment/${data.userId}/${data.commentId}`,
    );
    return {
      success: true,
      data: response.data,
      message: response.data.message,
      error: null,
    };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      success: false,
      data: null,
      message: null,
      error: error.response?.data?.message,
    };
  }
};
