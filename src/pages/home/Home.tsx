import { FeedHome } from "@/components/home/FeedHome";

import { OpportunitiesSidebar } from "../../components/home/OpportunitiesSidebar";

export function Home() {
  return (
    <div className="relative min-h-screen">

      <div className="pr-80">
        <FeedHome />
      </div>
      
      <OpportunitiesSidebar />
    </div>
  );
}
