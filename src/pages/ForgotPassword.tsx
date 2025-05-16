import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { forgotPasswordSchema } from "@/schemas/auth.schema";
import { ArrowLeft, AtSign } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export function ForgotPassword() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    console.log(values);
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <span
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground cursor-pointer mb-2"
            onClick={() => navigate("/auth")}
          >
            <ArrowLeft size={16} /> Voltar
          </span>
          <CardTitle>Redefinição de senha</CardTitle>
          <CardDescription>
            Insira seu e-mail e você receberá um código
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
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
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Confirmar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
