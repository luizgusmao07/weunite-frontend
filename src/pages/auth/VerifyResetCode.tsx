import { VerifyCode } from "@/components/auth/VerifyCode";

export function VerifyResetCode() {
  const redirectLink = "/forgot-password";
  const title = "Redefinição de senha";
  return <VerifyCode redirectLink={redirectLink} title={title} />;
}
