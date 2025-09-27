import FeedOpportunity from "@/components/opportunity/FeedOpportunity";
import { OpportunitySidebar } from "@/components/opportunity/OpportunitySidebar";
import { useBreakpoints } from "@/hooks/useBreakpoints";

export function Opportunity() {
  const { maxLeftSideBar } = useBreakpoints();

  return (
    <div className="relative min-h-screen">
      <div>
        <FeedOpportunity />
      </div>

      {!maxLeftSideBar && <OpportunitySidebar />}
    </div>
  );
}
