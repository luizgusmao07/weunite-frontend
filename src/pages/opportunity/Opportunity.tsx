import FeedOpportunity from "@/components/opportunity/FeedOpportunity";
import {
  OpportunitySidebar,
  OpportunitySidebarMobile,
} from "@/components/opportunity/OpportunitySidebar";
import OpportunitySearch, {
  type OpportunityFilters,
} from "@/components/opportunity/OpportunitySearch";
import type { OpportunityDisplay } from "@/@types/opportunity.types";
import { useState, useMemo } from "react";
import { useCreateOpportunity } from "@/state/useOpportunities";
import { Button } from "@/components/ui/button";
import { Building2, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockOpportunities: OpportunityDisplay[] = [
  {
    id: 1,
    title: "Jogador de Futebol de Campo - Meio-campista",
    description:
      "Time profissional procura meio-campista com experiência em competições estaduais. Foco em passes longos e visão de jogo. Oferecemos salário competitivo e estrutura profissional.",
    location: "São Paulo, SP",
    dateEnd: new Date("2025-01-25"),
    skills: [
      { id: 7, name: "Meio-campo" },
      { id: 16, name: "Visão de Jogo" },
      { id: 19, name: "Passes" },
      { id: 10, name: "Liderança" },
    ],
    company: {
      id: 1,
      name: "São Paulo Futebol Clube",
      logo: "",
    },
    subscribers: [],
    createdAt: new Date("2024-12-15"),
    updatedAt: new Date("2024-12-20"),
    companyId: 1,
    companyName: "São Paulo Futebol Clube",
    companyLogo: "",
    applicationsCount: 127,
    skillNames: ["Meio-campo", "Visão de Jogo", "Passes", "Liderança"],
    isExpired: false,
    daysUntilDeadline: 3,
  },
  {
    id: 2,
    title: "Treinador de Futsal - Categoria Sub-20",
    description:
      "Academia de futebol busca treinador experiente para categoria Sub-20 de futsal. Necessária experiência em formação de atletas e conhecimento tático avançado.",
    location: "Rio de Janeiro, RJ",
    dateEnd: new Date("2025-03-15"),
    skills: [
      { id: 2, name: "Futsal" },
      { id: 24, name: "Treinamento" },
      { id: 28, name: "Análise Tática" },
      { id: 10, name: "Liderança" },
      { id: 11, name: "Trabalho em Equipe" },
    ],
    company: {
      id: 2,
      name: "Academia Carioca de Futebol",
      logo: "",
    },
    subscribers: [],
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2024-12-10"),
    companyId: 2,
    companyName: "Academia Carioca de Futebol",
    companyLogo: "",
    applicationsCount: 89,
    skillNames: [
      "Futsal",
      "Treinamento",
      "Análise Tática",
      "Liderança",
      "Trabalho em Equipe",
    ],
    isExpired: false,
    daysUntilDeadline: 61,
  },
];

export function Opportunity() {
  const [isLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<OpportunityFilters>({
    location: "",
    skills: [],
    status: "all",
    dateRange: "all",
    companyType: "all",
  });

  const { mutate: createOpportunity } = useCreateOpportunity();
  const navigate = useNavigate();

  const handleCreateOpportunity = async (data: any) => {
    try {
      await createOpportunity(data);
    } catch (error) {
      console.error("Error creating opportunity:", error);
    }
  };

  const filteredOpportunities = useMemo(() => {
    let filtered = mockOpportunities;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (opportunity) =>
          opportunity.title.toLowerCase().includes(term) ||
          opportunity.description.toLowerCase().includes(term) ||
          opportunity.companyName.toLowerCase().includes(term) ||
          opportunity.location.toLowerCase().includes(term) ||
          opportunity.skillNames.some((skill) =>
            skill.toLowerCase().includes(term),
          ),
      );
    }

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter((opportunity) =>
        opportunity.location
          .toLowerCase()
          .includes(filters.location.toLowerCase()),
      );
    }

    // Filter by skills
    if (filters.skills.length > 0) {
      filtered = filtered.filter((opportunity) =>
        filters.skills.some((filterSkill) =>
          opportunity.skillNames.some((opportunitySkill) =>
            opportunitySkill.toLowerCase().includes(filterSkill.toLowerCase()),
          ),
        ),
      );
    }

    // Filter by status
    if (filters.status === "active") {
      filtered = filtered.filter((opportunity) => !opportunity.isExpired);
    } else if (filters.status === "closing_soon") {
      const daysLimit = 7; // Consider "closing soon" as within 7 days
      filtered = filtered.filter((opportunity) => {
        return opportunity.daysUntilDeadline <= daysLimit;
      });
    }

    return filtered;
  }, [searchTerm, filters]);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Layout (1024px+) */}
      <div className="hidden lg:flex">
        {/* Main Content */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-2xl">
            {/* Header fixo */}
            <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/40">
              <div className="px-6 py-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4 text-center">
                  Oportunidades
                </h1>
                <OpportunitySearch
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  filters={filters}
                  onFiltersChange={setFilters}
                />
              </div>
            </div>

            {/* Feed */}
            <div className="px-6 py-6">
              <FeedOpportunity
                opportunities={filteredOpportunities}
                isLoading={isLoading}
                emptyState={
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                      <span className="text-3xl">🔍</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      Nenhuma oportunidade encontrada
                    </h3>
                    <p className="text-muted-foreground max-w-md">
                      Tente ajustar os filtros ou refinar sua busca para
                      encontrar oportunidades relevantes.
                    </p>
                    <p className="text-sm text-muted-foreground bg-card/50 backdrop-blur-sm rounded-full px-4 py-2 inline-block border border-border/30 mt-6">
                      {filteredOpportunities.length} oportunidade
                      {filteredOpportunities.length !== 1 ? "s" : ""} encontrada
                      {filteredOpportunities.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                }
              />
            </div>
          </div>
        </div>

        {/* Sidebar Desktop */}
        <OpportunitySidebar onCreateOpportunity={handleCreateOpportunity} />
      </div>

      {/* Tablet Layout (768px - 1023px) */}
      <div className="hidden md:block lg:hidden">
        <div className="max-w-4xl mx-auto">
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/40">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent text-center flex-1">
                  Oportunidades
                </h1>
                <OpportunitySidebarMobile
                  onCreateOpportunity={handleCreateOpportunity}
                />
              </div>
              <OpportunitySearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filters={filters}
                onFiltersChange={setFilters}
              />
            </div>
          </div>

          <div className="px-6 py-6">
            <FeedOpportunity
              opportunities={filteredOpportunities}
              isLoading={isLoading}
              emptyState={
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                    <span className="text-3xl">🔍</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Nenhuma oportunidade encontrada
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    Tente ajustar os filtros ou refinar sua busca para encontrar
                    oportunidades relevantes.
                  </p>
                  <p className="text-sm text-muted-foreground bg-card/50 backdrop-blur-sm rounded-full px-4 py-2 inline-block border border-border/30 mt-6">
                    {filteredOpportunities.length} oportunidade
                    {filteredOpportunities.length !== 1 ? "s" : ""} encontrada
                    {filteredOpportunities.length !== 1 ? "s" : ""}
                  </p>
                </div>
              }
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout (até 767px) */}
      <div className="md:hidden">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/40">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent text-center flex-1">
                Oportunidades
              </h1>
              <OpportunitySidebarMobile
                onCreateOpportunity={handleCreateOpportunity}
              />
            </div>
            <div className="space-y-3">
              <OpportunitySearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filters={filters}
                onFiltersChange={setFilters}
              />
            </div>
          </div>
        </div>

        <div className="px-3 sm:px-4 py-4 sm:py-6">
          {/* Botões de navegação móvel */}
          <div className="mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/opportunity/my")}
                className="group flex-shrink-0 gap-2 bg-gradient-to-r from-card to-card/90 hover:from-green-50 hover:to-green-100 dark:hover:from-green-950/20 dark:hover:to-green-900/30 border-border hover:border-green-300 transition-all duration-300 hover:shadow-md"
              >
                <div className="p-1 rounded bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-800/40 transition-colors duration-300">
                  <Building2 className="h-3 w-3 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-medium group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300 whitespace-nowrap">
                  Minhas Oportunidades
                </span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/opportunity/saved")}
                className="group flex-shrink-0 gap-2 bg-gradient-to-r from-card to-card/90 hover:from-green-50 hover:to-green-100 dark:hover:from-green-950/20 dark:hover:to-green-900/30 border-border hover:border-green-300 transition-all duration-300 hover:shadow-md"
              >
                <div className="p-1 rounded bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-800/40 transition-colors duration-300">
                  <Bookmark className="h-3 w-3 text-green-600 dark:text-green-400 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300" />
                </div>
                <span className="font-medium group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300 whitespace-nowrap">
                  Oportunidades Salvas
                </span>
              </Button>
            </div>
          </div>
          <FeedOpportunity
            opportunities={filteredOpportunities}
            isLoading={isLoading}
            emptyState={
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">
                  Nenhuma oportunidade encontrada
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm px-4">
                  Tente ajustar os filtros ou refinar sua busca para encontrar
                  oportunidades relevantes.
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground bg-card/50 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 inline-block border border-border/30 mt-4">
                  {filteredOpportunities.length} oportunidade
                  {filteredOpportunities.length !== 1 ? "s" : ""} encontrada
                  {filteredOpportunities.length !== 1 ? "s" : ""}
                </p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
