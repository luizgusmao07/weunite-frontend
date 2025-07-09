
import { LeftSidebar } from "@/components/shared/LeftSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoutes() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={"/auth/login"} replace />;
  }


  return (
    <SidebarProvider>
      <LeftSidebar />
      <Outlet />
    </SidebarProvider>
  )
}
