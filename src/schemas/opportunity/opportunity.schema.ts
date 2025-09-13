import { z } from "zod";

export const createOpportunitySchema = z.object({
  title: z
    .string()
    .min(1, { message: "O título é obrigatório" })
    .max(100, { message: "O título deve ter no máximo 100 caracteres" }),
  description: z
    .string()
    .min(1, { message: "A descrição é obrigatória" })
    .max(1000, { message: "A descrição deve ter no máximo 1000 caracteres" }),
  location: z
    .string()
    .min(1, { message: "O local é obrigatório" })
    .max(200, { message: "O local deve ter no máximo 200 caracteres" }),
  date: z.date({
    required_error: "A data é obrigatória.",
  }),
  skills: z
    .string()
    .min(1, { message: "As habilidades são obrigatórias" })
    .max(300, { message: "As habilidades devem ter no máximo 300 caracteres" }),
});