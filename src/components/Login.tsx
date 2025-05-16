import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function Login({
  setCurrentTab,
}: {
  setCurrentTab: (tab: string) => void;
}) {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>

      <div className="flex flex-col items-center space-y-2 pt-15">
         <DotLottieReact
            src="https://lottie.host/5ce60653-911c-4bcc-b385-b8be5f43b51e/OGOTw3OGfF.lottie"
            loop
            autoplay
            className="w-50 m-0"
          />
      </div>

      <Card className="overflow-hidden w-full w-125">

        <Form {...form}>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-2 hover:underline"
                onClick={() => navigate("/forgot-password")}
              >
                Esqueceu sua senha?
              </a>
            </div>
          </div>
          <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col item-center text-center">
                <FormItem>
                  <h1 className="text-2x1 front-bold">Bem Vindo</h1>
                  <p className="text-balance text-muted-foreground">
                    Faça o login usando sua conta WeUnite
                  </p>
                </FormItem>
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="grid gap-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          placeholder="weunite@exemplo.com"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <FormLabel>Senha</FormLabel>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Esqueceu sua senha?
                      </a>
                    </div>

                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />

                        <button
                          type="button"
                          className="absolute right-3 top-2.25 -translate-y1/2 text-muted-foreground"
                          onClick={() => setShowPassword((v) => !v)}
                          tabIndex={-1}
                          aria-label={
                            showPassword ? "Ocultar senha" : "Mostrar senha"
                          }
                        >
                          {showPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.269-2.943-9.543-7a9.956 9.956 0 012.293-3.95M6.873 6.872A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.043 5.112M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3l18 18"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </div>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>

              <div
                className="relative text-center text-sm after:absolute after:insert-0 after:top-1/2 
                              after:z-0 after:flex after:items-center after:border-t after:border-border"
              >
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Ou continue com
                </span>
              </div>

              <div className="item-center text-center">
                <Button variant="outline" className="w-40">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login com Google</span>
                </Button>
              </div>

              <div className="text-center text-sm">
                Não tem uma conta? <br />
                <span className="text-muted-foreground">
                  Cadastre-se como{" "}
                  <a
                    href="#"
                    className="underline decoration-solid"
                    onClick={() => setCurrentTab("signupcompany")}
                  >
                    clube
                  </a>{" "}
                  ou{" "}
                  <a
                    href="#"
                    className="underline decoration-solid"
                    onClick={() => setCurrentTab("signup")}
                  >
                    atleta
                  </a>
                </span>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
