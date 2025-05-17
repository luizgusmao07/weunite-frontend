import { VerifyCode } from "@/components/auth/VerifyCode";

export function VerifyEmail() {
  const redirectLink = "/auth/signup";
  const title = "Verificação de e-mail"
  return <VerifyCode redirectLink={redirectLink} title={title} />;
}
