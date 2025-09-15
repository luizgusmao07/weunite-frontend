import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, Filter, MapPin, Calendar, X } from "lucide-react";
import { useState } from "react";

interface OpportunitySearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: OpportunityFilters;
  onFiltersChange: (filters: OpportunityFilters) => void;
}

export interface OpportunityFilters {
  location: string;
  skills: string[];
  status: "all" | "active" | "expired" | "closing_soon";
  dateRange: "all" | "week" | "month";
  companyType: "all" | "specific";
}

const skillOptions = [
  "Futebol de Campo",
  "Futsal",
  "Beach Soccer",
  "Futebol Society",
  "Goleiro",
  "Defesa",
  "Meio-campo",
  "Ataque",
  "Capitania",
  "Liderança",
  "Trabalho em Equipe",
  "Disciplina",
  "Resistência Física",
  "Velocidade",
  "Técnica Individual",
  "Visão de Jogo",
  "Finalização",
  "Cruzamentos",
  "Passes",
  "Marcação",
  "Cobrança de Falta",
  "Penalti",
  "Arbitragem",
  "Treinamento",
  "Preparação Física",
  "Nutrição Esportiva",
  "Fisioterapia",
  "Análise Tática",
  "Scouting",
  "Gestão Esportiva",
  "Marketing Esportivo",
  "Mídia Esportiva",
  "Transmissão Esportiva",
  "Fotografia Esportiva",
];

const locationOptions = [
  "São Paulo - SP",
  "Rio de Janeiro - RJ",
  "Belo Horizonte - MG",
  "Santos - SP",
  "Remoto",
  "Porto Alegre - RS",
  "Brasília - DF",
  "Curitiba - PR",
  "Salvador - BA",
  "Recife - PE",
];

export default function OpportunitySearch({
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
}: OpportunitySearchProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFiltersCount =
    (filters.location ? 1 : 0) +
    (filters.skills.length > 0 ? 1 : 0) +
    (filters.status !== "all" ? 1 : 0) +
    (filters.dateRange !== "all" ? 1 : 0);

  const clearFilters = () => {
    onFiltersChange({
      location: "",
      skills: [],
      status: "all",
      dateRange: "all",
      companyType: "all",
    });
  };

  const toggleSkill = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter((s) => s !== skill)
      : [...filters.skills, skill];

    onFiltersChange({ ...filters, skills: newSkills });
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar oportunidades..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-12 h-10 w-full bg-card border-border focus:border-third focus:ring-1 focus:ring-third/20"
          />
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <button
                aria-label="Abrir filtros"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-md border border-border/60 bg-background/70 hover:bg-third/10 hover:border-third/40 grid place-items-center transition-colors"
              >
                <div className="relative">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full text-[10px] leading-4 bg-third text-white font-bold text-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-72 sm:w-80" align="end" sideOffset={8}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Filtros</h4>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="h-6 px-2 text-xs text-muted-foreground"
                    >
                      Limpar
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">
                    Status
                  </label>
                  <div className="flex gap-1">
                    {[
                      { value: "all", label: "Todas" },
                      { value: "active", label: "Ativas" },
                      { value: "expired", label: "Expiradas" },
                    ].map(({ value, label }) => (
                      <Button
                        key={value}
                        variant={filters.status === value ? "third" : "outline"}
                        size="sm"
                        onClick={() =>
                          onFiltersChange({
                            ...filters,
                            status: value as any,
                          })
                        }
                        className="h-7 px-3 text-xs"
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">
                    Prazo
                  </label>
                  <div className="flex gap-1">
                    {[
                      { value: "all", label: "Todos" },
                      { value: "week", label: "7 dias" },
                      { value: "month", label: "30 dias" },
                    ].map(({ value, label }) => (
                      <Button
                        key={value}
                        variant={
                          filters.dateRange === value ? "third" : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          onFiltersChange({
                            ...filters,
                            dateRange: value as any,
                          })
                        }
                        className="h-7 px-3 text-xs"
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Localização
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) =>
                      onFiltersChange({
                        ...filters,
                        location: e.target.value,
                      })
                    }
                    className="w-full h-8 px-2 text-xs bg-card border border-border rounded-md"
                  >
                    <option value="">Todas as localizações</option>
                    {locationOptions.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">
                    Habilidades
                  </label>
                  <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                    {skillOptions.map((skill) => (
                      <Button
                        key={skill}
                        variant={
                          filters.skills.includes(skill) ? "third" : "outline"
                        }
                        size="sm"
                        onClick={() => toggleSkill(skill)}
                        className="h-6 px-2 text-xs"
                      >
                        {skill}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {(filters.location ||
        filters.status !== "all" ||
        filters.skills.length > 0) && (
        <div className="mt-4">
          <div className="flex items-center gap-2 flex-wrap">
            {filters.location && (
              <Badge
                variant="secondary"
                className="gap-1 bg-third/10 text-third text-xs"
              >
                <MapPin className="h-3 w-3" />
                <span className="hidden sm:inline">Local: </span>
                {filters.location.split(" - ")[0]}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive ml-1"
                  onClick={() => onFiltersChange({ ...filters, location: "" })}
                />
              </Badge>
            )}

            {filters.status !== "all" && (
              <Badge
                variant="secondary"
                className="gap-1 bg-third/10 text-third text-xs"
              >
                <Calendar className="h-3 w-3" />
                {filters.status === "active" ? "Ativas" : "Expiradas"}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive ml-1"
                  onClick={() => onFiltersChange({ ...filters, status: "all" })}
                />
              </Badge>
            )}

            {filters.dateRange !== "all" && (
              <Badge
                variant="secondary"
                className="gap-1 bg-third/10 text-third text-xs"
              >
                <Calendar className="h-3 w-3" />
                {filters.dateRange === "week" ? "7 dias" : "30 dias"}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive ml-1"
                  onClick={() =>
                    onFiltersChange({ ...filters, dateRange: "all" })
                  }
                />
              </Badge>
            )}

            {filters.skills.slice(0, 3).map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="gap-1 bg-third/10 text-third text-xs"
              >
                {skill}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive ml-1"
                  onClick={() => toggleSkill(skill)}
                />
              </Badge>
            ))}

            {filters.skills.length > 3 && (
              <Badge
                variant="secondary"
                className="bg-muted text-muted-foreground text-xs"
              >
                +{filters.skills.length - 3} habilidades
              </Badge>
            )}

            {activeFiltersCount > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive ml-2"
              >
                Limpar tudo
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
