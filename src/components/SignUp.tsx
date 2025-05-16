import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { signUpSchema } from "@/schemas/auth.schema";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { User, AtSign, KeyRound, UserCircle, EyeOff, Eye } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Checkbox } from "./ui/checkbox";
import { usePasswordStrength } from "@/hooks/usePasswordStrength";
import { useState } from "react";

export function SignUp({
  setCurrentTab,
}: {
  setCurrentTab: (tab: string) => void;
}) {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const password = form.watch("password");
  const progress = usePasswordStrength(password);
  const [showPassword, setShowPassword] = useState(false);

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    console.log(values);
  }

  return (
    <div className="flex flex-col space-y-2">
      
      <div className="flex justify-center pt-15">
        <DotLottieReact
          src="https://lottie.host/a06a613a-efd2-4dbd-96d0-2f4fd7344792/0jYYhWcj4H.lottie"
          loop
          autoplay
          className="w-50 m-0"
        />
      </div>

      <Card className="w-125">
        <CardContent>
          <div className="text-center mb-3">
            <h2 className="text-2xl font-bold">Crie sua conta</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Preencha os dados abaixo para começar
            </p>
          </div>
          <div className="space-y-4">
            <Form {...form}>
              <form
                className="space-y-3"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="João da Silva"
                            className="pl-8"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <UserCircle className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="JoãoSilva"
                            className="pl-8"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <AtSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="joaosilva@provedor.com"
                            className="pl-8"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="joaosilva1B@"
                            className="pl-8"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 transition-transform duration-300 ease-in-out"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground animate-pulse" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground animate-pulse" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col space-y-3">
                  <div>
                    <Progress value={progress} />
                    <span className="text-xs">Segurança da senha</span>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <label
                      htmlFor="terms"
                      className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Aceitar{" "}
                      <a href="" className="underline decoration-solid">
                        termos e condições
                      </a>
                    </label>
                  </div>

                  <Button type="submit">Cadastrar</Button>
                  <span className="text-xs">
                    Já se cadastrou? {""}
                    <a
                      href="#"
                      className="underline decoration-solid"
                      onClick={() => setCurrentTab("login")}
                    >
                      Login
                    </a>
                  </span>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUp;
