import { z } from "zod";
import { emailSchema } from "../common/user.schema";

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, {
    message: "A senha é obrigatória",
  }),
});
