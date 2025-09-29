import { Skeleton } from "@/components/ui/skeleton";
import { useGetOpportunities } from "@/state/useOpportunities";
import OpportunityCard from "./OpportunityCard";
import type { OpportunityDisplay } from "@/@types/opportunity.types";
import { OpportunitySidebar } from "./OpportunitySidebar";

function OpportunitySkeleton() {
  return (
    <div className="w-full max-w-[500px] mb-3 bg-card border rounded-xl p-4">
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

      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>

      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-18 rounded-full" />
      </div>

      <div className="flex justify-between border-t pt-4">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
        <Skeleton className="h-8 w-8 rounded" />
      </div>
    </div>
  );
}

export default function FeedOpportunity() {
  const { data, isLoading } = useGetOpportunities();
  const opportunities = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center w-full">
        <OpportunitySidebar />
        <div className="max-w-[600px] w-full flex flex-col items-center">
          {Array.from({ length: 3 }).map((_, index) => (
            <OpportunitySkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (!opportunities || opportunities.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="text-center space-y-3">
          <div className="text-4xl mb-4">🏢</div>
          <p className="text-muted-foreground text-lg font-medium">
            Nenhuma oportunidade disponível
          </p>
          <p className="text-sm text-muted-foreground">
            Novas oportunidades aparecerão aqui em breve
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full pt-4">
      <div className="max-w-[600px] w-full flex flex-col items-center gap-2">
        <OpportunitySidebar />
        {opportunities.map((opportunity: OpportunityDisplay) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </div>
    </div>
  );
}
