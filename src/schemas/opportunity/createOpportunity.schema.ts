import { z } from "zod";

export const skillSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Nome da habilidade é obrigatório"),
});

export const createOpportunitySchema = z.object({
  title: z
    .string()
    .min(3, "Título deve ter pelo menos 3 caracteres")
    .max(120, "Título muito longo"),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(5000, "Descrição muito longa"),
  location: z.string().min(1, "Localização é obrigatória"),
  dateEnd: z.date({ required_error: "Data de término é obrigatória" }),
  skills: z.string().min(1, "Digite pelo menos uma habilidade"),
});
