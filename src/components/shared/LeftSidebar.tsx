import {
  Home, Search, Link, MessageCircleMore, DiamondPlus, LogOut, User, Settings, Moon,
  Sun
} from "lucide-react";

import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarHeader, SidebarTrigger, SidebarFooter,
} from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";

import { useTheme } from "@/components/ThemeProvider";
import { useLocation } from 'react-router-dom';
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from 'react-router-dom';

export function LeftSidebar() {
  const { state } = useSidebar();

  const { setTheme, theme } = useTheme()
  const themeIcon = theme === "dark" ? Sun : Moon;
  const location = useLocation();
  const pathname = location.pathname;
  const getIncoColor = (path: string): string => (pathname === path ? "#22C55E" : "currentColor");

  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Isso já vai atualizar o localStorage devido ao middleware persist
    navigate('/auth/login');
  };

  const themeItem = {
    title: "Modo de cor",
    url: "#",
    icon: themeIcon,
  };

  const items = [
    { title: "Home", url: "/", icon: Home, color: getIncoColor("/") },
    { title: "Oportunidade", url: "#", icon: Link },
    { title: "Chat", url: "#", icon: MessageCircleMore },
    { title: "Pesquisar", url: "#", icon: Search },
    { title: "Criar Publicação", url: "#", icon: DiamondPlus },
    themeItem,
  ];

  return (

    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className={`${state === "collapsed" ? "flex justify-center items-center" : "pt-4 "}`}>
          {state === "collapsed" ? (
            <div className="flex items-center justify-center w-full py-4">
              <span className="font-bold text-xl text-primary">W</span>
              <SidebarTrigger className="p-0 m-0" />
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span
                className={`
                        font-bold transition-all duration-200 overflow-hidden whitespace-nowrap max-w-xs opacity-100 text-xl ml-2
                      `}
                style={{
                  transition: "all 0.2s",
                }}
              >
                <span className="text-primary ">We</span>
                <span className="text-green-500">Unite</span>
              </span>
              <SidebarTrigger />
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={state === "collapsed" ? "text-center" : ""}>
            {state !== "collapsed" && "Navegação"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className={state === "collapsed" ? "flex flex-col items-center gap-6" : "gap-4"}>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className={state === "collapsed" ? "w-full flex justify-center mb-2" : "mb-2"}>
                  <SidebarMenuButton
                    asChild
                    tooltip={state === "collapsed" ? item.title : undefined}
                  >
                    <a
                      href={item.url}
                      onClick={(e) => {
                        if (item.title === "Modo de cor") {
                          e.preventDefault();
                          setTheme(theme === "dark" ? "light" : "dark");
                        }
                      }}
                      className={`flex ${state === "collapsed" ? "justify-center w-full py-2" : "items-center gap-2"}`}
                    >
                      <div className={state === "collapsed" ? "flex justify-center" : ""}>
                        <item.icon style={{ width: '24px', height: '24px', color: (item.url !== "#" && pathname === item.url) ? "#22C55E" : "currentColor" }} />
                      </div>
                      {state !== "collapsed" && (
                        <span className={item.url !== "#" && pathname === item.url ? "text-[#22C55E]" : ""}>
                          {item.title}
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className={state === "collapsed" ? "w-full flex justify-center" : ""}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className={`flex ${state === "collapsed" ? "justify-center w-full" : "items-center gap-2"}`}>
                  <Avatar className={state === "collapsed" ? "mx-auto" : ""}>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {state !== "collapsed" && <p>Nome do usuário</p>}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={state === "collapsed" ? "top" : "top"}
                align={state === "collapsed" ? "start" : "center"}
                alignOffset={state === "collapsed" ? 8 : 0}
                sideOffset={state === "collapsed" ? 8 : 6}
                className="w-56 p-2 border rounded-lg shadow-lg animate-in slide-in-from-bottom-5 duration-200"
              >
                <div className="px-3 py-2 mb-1 border-b border-gray-100">
                  <p className="font-medium">Nome do usuário</p>
                  <p className="text-xs text-muted-foreground">usuario@email.com</p>
                </div>

                <div className="space-y-1 py-1">
                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                    <User className="h-4 w-4 text-gray-500" />
                    <p>Perfil</p>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                    <Settings className="h-4 w-4 text-gray-500" />
                    <p>Configurações</p>
                  </DropdownMenuItem>
                </div>

                <div className="h-px bg-gray-100 my-1"></div>
                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-red-600 hover:bg-red-50 transition-colors" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 -scale-x-100" />
                  <p>Sair</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>

  );
}