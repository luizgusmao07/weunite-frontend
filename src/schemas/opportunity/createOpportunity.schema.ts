import { z } from "zod";

export const createOpportunitySchema = z.object({
  title: z
    .string()
    .min(3, "Título deve ter pelo menos 3 caracteres")
    .max(120, "Título muito longo"),
  company: z.string().min(1, "Empresa é obrigatória"),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(5000, "Descrição muito longa"),
  workStyle: z.string().optional(),
  seniority: z.string().optional(),
  contractType: z.string().optional(),
  location: z.string().min(1, "Localização é obrigatória"),
  salary: z.string().optional(),
  applicationDeadline: z.date().optional(),
  skills: z.string().min(1, "Habilidades são obrigatórias"),
});

export type CreateOpportunityFormData = z.infer<typeof createOpportunitySchema>;
