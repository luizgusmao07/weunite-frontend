import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { Building2, Bookmark, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CreateOpportunity } from "@/components/shared/CreateOpportunity";
import { useState } from "react";

export function OpportunitySidebar() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  if (!isAuthenticated) return null;

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:right-8 lg:top-32 z-30 pointer-events-auto space-y-4">
      <Button
        onClick={() => setIsCreateOpen(true)}
        className="w-full justify-center gap-2 h-12 bg-gradient-to-r from-third to-green-500 hover:from-green-500 hover:to-emerald-500 text-white shadow-md hover:shadow-lg transition-all duration-300"
      >
        <Plus className="h-4 w-4" />
        Criar Oportunidade
      </Button>

      <CreateOpportunity open={isCreateOpen} onOpenChange={setIsCreateOpen} />

      <Button
        variant="outline"
        onClick={() => navigate("/opportunity/my")}
        className="w-full justify-start gap-3 h-12 bg-card hover:bg-accent border-border hover:border-third/40 transition-all duration-300"
      >
        <Building2 className="h-4 w-4 text-third" />
        <span className="font-medium">Minhas Oportunidades</span>
      </Button>

      <Button
        variant="outline"
        onClick={() => navigate("/opportunity/saved")}
        className="w-full justify-start gap-3 h-12 bg-card hover:bg-accent border-border hover:border-third/40 transition-all duration-300"
      >
        <Bookmark className="h-4 w-4 text-third" />
        <span className="font-medium">Oportunidades Salvas</span>
      </Button>
    </div>
  );
}
