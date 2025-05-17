import { z } from "zod";
import { emailSchema } from "../common/user.schema";

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const verifyResetCodeSchema = z.object({
  code: z.string().min(6, { message: "O código deve ter 6 digitos" }),
});
