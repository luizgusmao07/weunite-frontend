import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X as CloseIcon } from "lucide-react"; // Importando o ícone X para fechar
import { Sun, Moon, Search as SearchIcon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function HeaderMobile() {
  const { setTheme, theme } = useTheme();
  const themeIcon = theme === "dark" ? Sun : Moon;

  const themeItem = {
    title: "Modo de cor",
    url: "#",
    icon: themeIcon,
  };

  const items = [themeItem];

  return (
    <>
      <div className="w-full border-t bg-sidebar z-50">
        <div className="flex justify-between items-center h-15">
          <div className="ml-4">
            <span className="font-bold text-xl ml-2 items-left">
              <span className="text-primary">We</span>
              <span className="text-third">Unite</span>
            </span>
          </div>

          <div className="flex items-center gap-4 mr-6">
            {items.map((item) => (
              <button
                key={item.title}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.title === "Modo de cor") {
                    setTheme(theme === "dark" ? "light" : "dark");
                  }
                }}
                className="p-2 rounded-full hover:bg-muted transition-colors hover:cursor-pointer"
                aria-label={item.title}
              >
                <item.icon size={20} className="text-foreground" />
              </button>
            ))}

            <Drawer >
              <DrawerTrigger>
                <SearchIcon className="h-5 w-5"/>
              </DrawerTrigger>
              <DrawerContent className="h-[80vh] data-[vaul-drawer-direction=bottom]:max-h-[100vh]  mt-0 ">
                <DrawerHeader className="pt-8 px-6 relative">
                  <DrawerClose className="absolute rounded-sm transition-opacity right-4">
                    <CloseIcon className="h-5 w-5" />
                  </DrawerClose>
                  <DrawerTitle className="mb-4">Pesquisar</DrawerTitle>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="faça sua pesquisa..."
                      className="pl-10"
                    />
                  </div>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </>
  );
}
