import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface OpportunitySearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function OpportunitySearch({
  searchTerm,
  onSearchChange,
}: OpportunitySearchProps) {
  return (
    <div className="w-full pr-3 pl-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar oportunidades..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-8 w-full bg-card border-border focus:border-third focus:ring-1 focus:ring-third/20 ml-1"
        />
      </div>
    </div>
  );
}
