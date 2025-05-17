import { z } from "zod";
import { passwordSchema } from "./password.schema";

function isValidCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj.length !== 14) return false;

  if (/^(\d)\1+$/.test(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number(digitos.charAt(1))) return false;

  return true;
}

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
      message: "O e-mail é obrigatório",
    })
    .email({
      message: "E-mail inválido (ex. válido: exemplo@provedor.com)",
    }),
  password: passwordSchema,
});

export const signUpCompanySchema = z.object({
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
      message: "O e-mail é obrigatório",
    })
    .email({
      message: "E-mail inválido (ex. válido: exemplo@provedor.com)",
    }),
  cnpj: z.string().refine((val) => isValidCNPJ(val), {
    message: "CNPJ inválido",
  }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "E-mail inválido (ex. válido: exemplo@provedor.com)",
  }),
});
