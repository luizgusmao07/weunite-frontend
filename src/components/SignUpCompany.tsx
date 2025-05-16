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
import { signUpCompanySchema } from "@/schemas/auth.schema";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { User, AtSign, UserCircle, Building2 } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Checkbox } from "./ui/checkbox";

export function SignUpCompany({
  setCurrentTab,
}: {
  setCurrentTab: (tab: string) => void;
}) {
  const form = useForm<z.infer<typeof signUpCompanySchema>>({
    resolver: zodResolver(signUpCompanySchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      cnpj: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpCompanySchema>) {
    console.log(values);
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <DotLottieReact
        src="https://lottie.host/a06a613a-efd2-4dbd-96d0-2f4fd7344792/0jYYhWcj4H.lottie"
        loop
        autoplay
        className="w-50 m-0"
      />
      <Card className="w-125 py-4">
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
                  name="cnpj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CNPJ</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="XX.XXX.XXX/0000-XX"
                            className="pl-8"
                            {...field}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Digite apenas números, sem símbolos ou pontuação.
                          </p>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col space-y-3">
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

export default SignUpCompany;
