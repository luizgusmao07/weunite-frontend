import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { Building2, Bookmark, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CreateOpportunity } from "@/components/opportunity/CreateOpportunity";
import { useState } from "react";

export function OpportunitySidebar() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  if (!isAuthenticated) return null;

  return (
    <>
      <div className="flex flex-row w-full fixed top-20 z-30 gap-5 pointer-events-auto space-y-4 ml-3 overflow-x-visible overflow-x-aut">
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="w-[12em] justify-center text-xs h-[2em] bg-gradient-to-r from-third to-green-500 hover:from-green-500 hover:to-emerald-500 text-white shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Plus className="h-3 w-3" />
          Criar Oportunidade
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate("/opportunity/my")}
          className="w-[14em] justify-center text-xs h-[2em] bg-gradient-to-r from-third to-green-500 hover:from-green-500 hover:to-emerald-500 text-white shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Building2 className="h-4 w-4 text-white" />
          <span className="font-medium">Minhas Oportunidades</span>
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate("/opportunity/saved")}
          className="w-[14em] justify-center text-xs h-[2em] bg-gradient-to-r from-third to-green-500 hover:from-green-500 hover:to-emerald-500 text-white shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Bookmark className="h-4 w-4 text-white" />
          <span className="font-medium">Oportunidades Salvas</span>
        </Button>
      </div>

      <CreateOpportunity open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </>
  );
}
