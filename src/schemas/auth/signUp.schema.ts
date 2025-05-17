import { z } from "zod";
import { isValidCNPJ } from "../utils/validators";
import { emailSchema, nameSchema, passwordSchema, usernameSchema } from "../common/user.schema";

export const signUpSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const signUpCompanySchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  email: emailSchema,
  cnpj: z.string().refine((val) => isValidCNPJ(val), {
    message: "CNPJ inválido",
  }),
});
