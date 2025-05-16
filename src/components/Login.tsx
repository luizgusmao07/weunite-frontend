import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AtSign, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Login({
  setCurrentTab,
}: {
  setCurrentTab: (tab: string) => void;
}) {
  const navigate = useNavigate();
  return (
    <div>
      <Card className="overflow-hidden w-full max-w-125">
        <form className="p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col item-center text-center">
              <h1 className="text-2x1 front-bold">Bem Vindo</h1>
              <p className="text-balance text-muted-foreground">
                Faça o login usando sua conta WeUnite
              </p>
            </div>

            <div className="grid gap-2">
              <div className="relative">
                <AtSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="weunite@exemplo.com"
                  className="pl-8"
                  required
                />
              </div>
            </div>

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

              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="weuniteB1@"
                  className="pl-8"
                  required
                />
              </div>
            </div>

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
      </Card>
    </div>
  );
}
