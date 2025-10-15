import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { useBreakpoints } from "@/hooks/useBreakpoints";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { maxLeftSideBar } = useBreakpoints();

  return (
    <div className="min-h-screen bg-background">
      {!maxLeftSideBar && <AdminSidebar />}

      <div className={maxLeftSideBar ? "" : "ml-64"}>
        <AdminHeader />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
