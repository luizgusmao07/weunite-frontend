import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: "O e-mail é obrigatório",
    })
    .email({
      message: "E-mail inválido (ex. válido: exemplo@provedor.com)",
    }),
  password: z.string().min(1, {
    message: "A senha é obrigatória",
  }),
});
