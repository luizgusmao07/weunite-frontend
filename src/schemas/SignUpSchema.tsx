import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "A senha deve ter pelo menos 8 caracteres")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
  .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
  .regex(/[0-9]/, "A senha deve conter pelo menos um número")
  .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um símbolo");

export const signUpSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "O nome deve ter no minímo 5 caracteres",
    })
    .max(100, {
      message: "O nome deve ter no máximo 100 caracteres",
    }),
  username: z
    .string()
    .min(5, {
      message: "O nome de usuário deve ter no minímo 5 caracteres",
    })
    .max(30, {
      message: "O nome de usuário deve ter no máximo 100 caracteres",
    }),
  email: z
    .string()
    .min(1, {
      message: "E-mail é obrigatório",
    })
    .email({
      message: "E-mail inválido (ex. válido: exemplo@provedor.com)",
    }),
  password: passwordSchema,
});
