import type { CreateOpportunity } from "@/@types/opportunity.types";
import { instance as axios } from "../axios";
import { AxiosError } from "axios";

export const getOpportunitiesRequest = async () => {
  try {
    const response = await axios.get("/opportunities");
    console.log("✅ Oportunidades carregadas:", response.data);

    return {
      success: true,
      data: response.data,
      message: "Oportunidades carregadas com sucesso!",
      error: null,
    };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    console.error("❌ Erro ao carregar oportunidades:", error.response?.data);
    console.error("❌ Status:", error.response?.status);

    return {
      success: false,
      data: null,
      message: null,
      error:
        error.response?.data?.message ||
        error.message ||
        "Erro ao carregar oportunidades",
    };
  }
};

const toLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

try {
  const response = await axios.get("/opportunities");

  return {
    success: true,
    data: response.data,
    message: "Oportunidades carregadas com sucesso!",
    error: null,
  };
} catch (err) {
  const error = err as AxiosError<{ message: string }>;

  return {
    success: false,
    data: [],
    message: null,
    error: error.response?.data?.message || "Erro ao carregar oportunidades",
  };
}

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

    console.log("📤 Dados recebidos na API:", data);

    // Converter skills para array de strings
    let skillsArray: string[];
    if (typeof data.skills === "string") {
      // Se for string separada por vírgula, converter para array
      skillsArray = data.skills
        .split(",")
        .map((skill: string) => skill.trim())
        .filter((skill: string) => skill.length > 0);
      console.log("📤 Skills convertidas de string para array:", skillsArray);
    } else if (Array.isArray(data.skills)) {
      // Se for array de objetos Skill, extrair apenas os names
      skillsArray = data.skills.map((skill) => skill.name);
      console.log("📤 Skills extraídas de objetos para strings:", skillsArray);
    } else {
      skillsArray = [];
    }

    // O backend espera JSON puro, não FormData
    const payload = {
      title: data.title,
      description: data.description,
      location: data.location,
      dateEnd: toLocalDateString(data.dateEnd),
      skills: skillsArray, // Array de strings
    };

    console.log("📤 Payload JSON sendo enviado:", payload);
    console.log("📤 URL da requisição:", `/opportunities/create/${companyId}`);

    // TESTE: Vamos tentar diferentes URLs e métodos para debug
    console.log("🔍 Testando conectividade com o backend...");

    try {
      // Teste 1: Verificar se conseguimos fazer uma requisição GET simples
      console.log("🧪 Teste 1: GET simples...");
      const testResponse = await fetch("/api/opportunities", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      console.log("✅ GET test status:", testResponse.status);

      // Teste 2: Tentar POST direto no localhost:8080 (bypass do proxy)
      console.log("🧪 Teste 2: POST direto no backend...");
      const jwt = localStorage.getItem("auth-storage")
        ? JSON.parse(localStorage.getItem("auth-storage")!)?.state?.jwt
        : null;

      const directResponse = await fetch(
        `http://localhost:8080/opportunities/create/${companyId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
          },
          body: JSON.stringify(payload),
        },
      );

      console.log("✅ Direct POST status:", directResponse.status);

      if (!directResponse.ok) {
        const errorText = await directResponse.text();
        console.error("❌ Direct POST error:", errorText);
      } else {
        const result = await directResponse.json();
        console.log("✅ Direct POST success:", result);
        return {
          success: true,
          data: result,
          message: result.message || "Oportunidade criada com sucesso!",
          error: null,
        };
      }
    } catch (directError) {
      console.error("❌ Erro no teste direto:", directError);
    }

    // Se chegou até aqui, tentar com o proxy original
    console.log("🧪 Teste 3: POST via proxy...");
    const jwt2 = localStorage.getItem("auth-storage")
      ? JSON.parse(localStorage.getItem("auth-storage")!).state?.jwt
      : null;

    const response = await fetch(`/api/opportunities/create/${companyId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(jwt2 ? { Authorization: `Bearer ${jwt2}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    console.log("✅ Proxy POST status:", response.status);

    // Verificar se o status indica sucesso (200-299)
    if (response.status >= 200 && response.status < 300) {
      try {
        const result = await response.json();
        console.log("✅ Proxy POST success:", result);

        return {
          success: true,
          data: result,
          message: result.message || "Oportunidade criada com sucesso!",
          error: null,
        };
      } catch (jsonError) {
        console.log(
          "⚠️ Resposta sem JSON, mas status de sucesso:",
          response.status,
        );
        // Mesmo sem JSON, se o status é de sucesso, considerar como sucesso
        return {
          success: true,
          data: {},
          message: "Oportunidade criada com sucesso!",
          error: null,
        };
      }
    }

    // Se chegou aqui, houve erro
    const errorText = await response.text();
    console.error("❌ Proxy POST error:", errorText);

    // Mesmo com erro na resposta, se a oportunidade foi criada, podemos considerar sucesso
    if (errorText.includes("Created") || response.status === 201) {
      console.log("✅ Oportunidade criada apesar do erro na resposta");
      return {
        success: true,
        data: {},
        message: "Oportunidade criada com sucesso!",
        error: null,
      };
    }

    throw new Error(`HTTP ${response.status}: ${errorText}`);
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    console.error("❌ Erro na API:", error.response?.data);
    console.error("❌ Status:", error.response?.status);
    console.error("❌ Erro completo:", error);

    return {
      success: false,
      data: null,
      message: null,
      error: error.response?.data?.message || "Erro ao criar Oportunidade",
    };
  }
};
