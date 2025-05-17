import { Button } from "@/components/ui/button";
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
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeft, AtSign } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { forgotPasswordSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResendTimer } from "@/hooks/useResendTimer";
import { useState } from "react";

export function ForgotPassword() {
  const navigate = useNavigate();
  const { timer, canResend, startTimer } = useResendTimer(60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    setIsSubmitting(true);
    console.log(values);
    setTimeout(() => {
      setIsSubmitting(false);
      startTimer();
    }, 1500);
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-[380px] max-w-full">
        <CardHeader className="space-y-2">
          <button
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            onClick={() => navigate("/auth")}
          >
            <ArrowLeft size={16} /> Voltar
          </button>
          <div className="flex flex-col text-center space-y-2">
            <CardTitle className="text-2xl font-bold">
              Redefinição de senha
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Insira seu e-mail para redefinir sua senha
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <AtSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="weunite@exemplo.com"
                          className="pl-8"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-sm">
                      Você receberá um código de verificação
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full"
                type="submit"
                disabled={isSubmitting || !form.formState.isDirty || !canResend}
              >
                {isSubmitting ? "Enviando..." : "Confirmar"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-2">
          <div className="text-sm text-center">
            <Button
              variant="link"
              className="p-0 h-auto text-muted-foreground cursor-pointer"
              onClick={() => {
                const emailValue = form.getValues().email;
                if (emailValue) {
                  form.handleSubmit(onSubmit)();
                } else {
                  form.setError("email", {
                    type: "manual",
                    message: "Insira um e-mail para reenviar.",
                  });
                }
              }}
              disabled={isSubmitting || !canResend}
            >
              {canResend ? "Reenviar e-mail" : `Reenviar em ${timer}s`}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
