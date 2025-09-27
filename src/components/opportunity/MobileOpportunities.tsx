import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import OpportunityCard from "./OpportunityCard-new";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetOpportunities } from "@/state/useOpportunities";
import type { OpportunityDisplay } from "@/@types/opportunity.types";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

function OpportunitySkeleton() {
  return (
    <div className="w-full bg-card border rounded-xl p-4">
      <div className="flex items-center space-x-3 mb-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      <div className="flex justify-between border-t pt-4">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-8 rounded" />
      </div>
    </div>
  );
}

export function MobileOpportunities({ isOpen, onOpenChange }: Props) {
  const { data, isLoading } = useGetOpportunities();
  const opportunities = data?.data;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[70vh]">
        <SheetHeader>
          <SheetTitle>Oportunidades</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4 overflow-y-auto">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <OpportunitySkeleton key={index} />
            ))
          ) : !opportunities || opportunities.length === 0 ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="text-center space-y-2">
                <div className="text-2xl mb-2">🏢</div>
                <p className="text-muted-foreground">
                  Nenhuma oportunidade disponível
                </p>
              </div>
            </div>
          ) : (
            opportunities
              .slice(0, 6)
              .map((opportunity: OpportunityDisplay) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                />
              ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileOpportunities;
