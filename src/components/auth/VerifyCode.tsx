import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useState } from "react";
import { verifyResetCodeSchema } from "@/schemas/auth";
import { useResendTimer } from "@/hooks/useResendTimer";

export function VerifyCode({
  redirectLink,
  title,
}: {
  redirectLink: string;
  title: string;
}) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { timer, canResend, startTimer } = useResendTimer();

  const form = useForm<z.infer<typeof verifyResetCodeSchema>>({
    resolver: zodResolver(verifyResetCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  function onSubmit(value: z.infer<typeof verifyResetCodeSchema>) {
    setIsSubmitting(true);
    console.log(value);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  }

  function handleResendCode() {
    startTimer();
  }
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-[380px] max-w-full">
        <CardHeader className="space-y-2">
          <button
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            onClick={() => navigate(redirectLink)}
          >
            <ArrowLeft size={16} /> Voltar
          </button>
          <div className="flex flex-col text-center space-y-2">
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription className="text-muted-foreground">
              Um código de seis digitos foi enviado ao seu e-mail
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col items-center">
                    <FormControl>
                      <InputOTP maxLength={6} {...field} className="w-full">
                        <InputOTPGroup className="justify-center">
                          <InputOTPSlot
                            index={0}
                            className="transition-all duration-300 h-12 w-12"
                          />
                          <InputOTPSlot
                            index={1}
                            className="transition-all duration-300 h-12 w-12"
                          />
                          <InputOTPSlot
                            index={2}
                            className="transition-all duration-300 h-12 w-12"
                          />
                          <InputOTPSlot
                            index={3}
                            className="transition-all duration-300 h-12 w-12"
                          />
                          <InputOTPSlot
                            index={4}
                            className="transition-all duration-300 h-12 w-12"
                          />
                          <InputOTPSlot
                            index={5}
                            className="transition-all duration-300 h-12 w-12"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription className="text-center text-sm mt-2">
                      Digite o código enviado ao seu e-mail
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || !form.formState.isValid}
              >
                {isSubmitting ? "Verificando..." : "Verificar código"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <div className="text-sm text-center">
            <p>Não recebeu o código?</p>
            <Button
              variant="link"
              className="p-0 h-auto text-muted-foreground cursor-pointer"
              disabled={!canResend}
              onClick={handleResendCode}
            >
              {canResend ? "Reenviar código" : `Reenviar em ${timer}s`}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
