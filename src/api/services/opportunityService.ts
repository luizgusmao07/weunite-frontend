import type { CreateOpportunity } from "@/@types/opportunity.types";
import { instance as axios } from "../axios";
import { AxiosError } from "axios";

export const createOpportunityRequest = async (
  data: CreateOpportunity,
  companyId: number,
) => {
  try {
    const formData = new FormData();

    const opportunityBlob = new Blob(
      [
        JSON.stringify({
          title: data.title,
          description: data.description,
          location: data.location,
          dateEnd: data.dateEnd.toISOString(),
          skills: data.skills,
        }),
      ],
      {
        type: "application/json",
      },
    );

    formData.append("opportunity", opportunityBlob);

    const response = await axios.post(
      `/opportunities/create/${companyId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
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
      error: error.response?.data?.message || "Erro ao criar a oportunidade",
    };
  }
};

export const getOpportunitiesRequest = async () => {
  try {
    const response = await axios.get("/opportunities/get");
    return {
      success: true,
      data: response.data,
      message: response.data.message || "Oportunidades carregadas com sucesso!",
      error: null,
    };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      success: false,
      data: null,
      message: null,
      error:
        error.response?.data?.message || "Erro ao carregar as oportunidades",
    };
  }
};
