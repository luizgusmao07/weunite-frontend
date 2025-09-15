import type { CreateOpportunity } from "@/@types/opportunity.types";
import { instance as axios } from "../axios";
import { AxiosError } from "axios";

export const createOpportunityRequest = async (
  data: CreateOpportunity,
  companyId: number,
) => {
  try {
    const toLocalDateString = (d: Date | string) => {
      const date = d instanceof Date ? d : new Date(d);
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    };

    const payload = {
      title: data.title,
      description: data.description,
      location: data.location,
      dateEnd: toLocalDateString(data.dateEnd),
      skills: data.skills,
    };

    const response = await axios.post(
      `/opportunities/create/${companyId}`,
      payload,
    );

    return {
      success: true,
      data: response.data,
      message: response.data.message || "Oportunidade criada com sucesso!",
      error: null,
    };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    return {
      success: false,
      data: null,
      message: null,
      error: error.response?.data?.message || "Erro ao criar Oportunidade",
    };
  }
};
