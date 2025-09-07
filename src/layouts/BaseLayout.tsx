import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LeftSidebar } from "@/components/shared/LeftSidebar";
import { BottomSideBar } from "@/components/shared/BottomSideBar";
import { HeaderMobile } from "@/components/shared/HeaderMobile";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { OpportunitiesSidebar } from "@/components/home/OpportunitiesSidebar";
import { MobileOpportunities } from "@/components/opportunity/MobileOpportunities";

interface BaseLayoutProps {
  children: React.ReactNode;
  showOpportunities?: boolean;
}

export function BaseLayout({ children, showOpportunities = true }: BaseLayoutProps) {
  const { maxLeftSideBar, isDesktop } = useBreakpoints();
  const [isOpportunitiesOpen, setIsOpportunitiesOpen] = useState(false);

  useEffect(() => {
    if (maxLeftSideBar) {
      setIsOpportunitiesOpen(false);
    }
  }, [maxLeftSideBar]);

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        {!maxLeftSideBar && <LeftSidebar />}
        
        {maxLeftSideBar && <HeaderMobile />}
        
        <main className={`flex-1 transition-all duration-300 ${maxLeftSideBar ? "pb-20" : ""} ${showOpportunities && isDesktop ? "mr-80" : ""}`}>
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
        
        {showOpportunities && !maxLeftSideBar && isDesktop && (
          <OpportunitiesSidebar />
        )}
        
        {showOpportunities && maxLeftSideBar && (
          <MobileOpportunities 
            isOpen={isOpportunitiesOpen}
            onOpenChange={setIsOpportunitiesOpen}
          />
        )}
        
        {maxLeftSideBar && <BottomSideBar />}
      </div>
    </SidebarProvider>
  );
}