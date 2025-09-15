import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { Building2, Bookmark, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CreateOpportunity } from "@/components/opportunity/CreateOpportunity";

interface OpportunitySidebarProps {
  onCreateOpportunity?: (data: any) => Promise<void>;
}

export function OpportunitySidebar({
  onCreateOpportunity,
}: OpportunitySidebarProps = {}) {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  if (!isAuthenticated) return null;

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:right-8 lg:top-32 z-30 pointer-events-auto space-y-4">
      {isAuthenticated && (
        <CreateOpportunity onSubmit={onCreateOpportunity}>
          <Button className="group relative w-full justify-center gap-2 h-12 bg-gradient-to-r from-third to-green-500 hover:from-green-500 hover:to-emerald-500 text-white shadow-md hover:shadow-lg transition-all duration-300">
            <Plus className="h-4 w-4" />
            Criar Oportunidade
          </Button>
        </CreateOpportunity>
      )}
      <Button
        variant="outline"
        onClick={() => navigate("/opportunity/my")}
        className="group relative w-full justify-start gap-3 h-12 bg-gradient-to-r from-card to-card/90 hover:from-green-50 hover:to-green-100 dark:hover:from-green-950/20 dark:hover:to-green-900/30 border-border hover:border-green-300 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 overflow-hidden"
      >
        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-800/40 transition-colors duration-300">
            <Building2 className="h-4 w-4 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="font-medium text-foreground group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300">
            Minhas Oportunidades
          </span>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="pointer-events-none absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </Button>

      <Button
        variant="outline"
        onClick={() => navigate("/opportunity/saved")}
        className="group relative w-full justify-start gap-3 h-12 bg-gradient-to-r from-card to-card/90 hover:from-green-50 hover:to-green-100 dark:hover:from-green-950/20 dark:hover:to-green-900/30 border-border hover:border-green-300 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 overflow-hidden"
      >
        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-800/40 transition-colors duration-300">
            <Bookmark className="h-4 w-4 text-green-600 dark:text-green-400 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300" />
          </div>
          <span className="font-medium text-foreground group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300">
            Oportunidades Salvas
          </span>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="pointer-events-none absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </Button>
    </div>
  );
}

export function OpportunitySidebarMobile({
  onCreateOpportunity,
}: OpportunitySidebarProps = {}) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return null;

  return (
    <div className="lg:hidden">
      <CreateOpportunity onSubmit={onCreateOpportunity}>
        <Button
          size="sm"
          className="group flex-shrink-0 gap-2 bg-gradient-to-r from-third to-green-500 hover:from-green-500 hover:to-emerald-500 text-white shadow-md hover:shadow-lg transition-all duration-300 min-w-fit"
        >
          <Plus className="h-3 w-3" />
          <span className="font-medium whitespace-nowrap">Criar</span>
        </Button>
      </CreateOpportunity>
    </div>
  );
}
