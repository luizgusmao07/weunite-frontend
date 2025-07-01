import React, { useState } from "react";
import { Button } from "../ui/button";
import CardSuggestionOpportunity from "../opportunity/CardSuggestionOpportunity";

const cardSuggestion = Array.from({ length: 4 }, (_, i) => i);

export const OpportunitiesSidebar: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [visibleOpportunities, setVisibleOpportunities] = useState(1);

  const handleShowMore = () => {
    if (!showAll) {
      setShowAll(true);
      setVisibleOpportunities(cardSuggestion.length);
    }
  };

  const handleClose = () => {
    setShowAll(false);
    setVisibleOpportunities(1);
  };

  const displayedOpportunities = cardSuggestion.slice(0, visibleOpportunities);

  return (
    <div className="fixed right-0 top-0 h-screen w-80 z-10 pointer-events-none mr-6">
          <div className="flex items-center justify-center mb-4 mt-6 ">
            <h2 className="text-lg font-semibold text-sidebar-foreground">
              Sugestões de oportunidade
            </h2>
         </div>

        <div className="flex-1 pointer-events-auto ">
            
            <div className="space-y-4 justify-end"> 
              {showAll && (

                <div className="flex justify-end">
                  <button
                    onClick={handleClose} 
                    className="text-sm text-third font-medium mr-1 bg-transparent hover:cursor-pointer hover:bg-transparent "
                  >
                    Fechar
                  </button>
                </div>
              )}
              
              {displayedOpportunities.map((cardSuggestion) => (
                <CardSuggestionOpportunity key={cardSuggestion} />
              ))}
            </div>

            {!showAll && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleShowMore}
                  className="text-sm text-third font-medium duration-200 mr-0.6 bg-transparent hover:cursor-pointer  hover:bg-hover-button"
                >
                  Ver Outras 
                </button>
                
              </div>
            )}

        </div>
      </div>   
      
  );
};
