
import { OpportunitiesSidebar } from '../../components/home/OpportunitiesSidebar';

export function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Main content */}
      <div className="pr-80"> {/* Add padding-right to make space for the sidebar */}
        <p>Home</p>
        {/* Add your main content here */}
      </div>
      
      {/* Fixed sidebar on the right */}
      <OpportunitiesSidebar />
    </div>
  );
}