import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Lightbulb } from "lucide-react";
import CardSuggestionOpportunity from "../opportunity/CardSuggestionOpportunity";

const cardSuggestion = Array.from({ length: 4 }, (_, i) => i);

const useCustomBreakpoint = (breakpoint: number = 1500) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= breakpoint);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);

  return isDesktop;
};

export const OpportunitiesSidebar: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [visibleOpportunities, setVisibleOpportunities] = useState(1);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const isDesktop = useCustomBreakpoint(1500);

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

  const OpportunitiesContent = () => (
    <>
      {showAll && (
        <div className="flex justify-end mb-2">
          <button
            onClick={handleClose}
            className="text-sm text-third font-medium mr-1 bg-transparent hover:cursor-pointer hover:bg-transparent"
          >
            Fechar
          </button>
        </div>
      )}

      <div className="space-y-4 justify-end">
        {displayedOpportunities.map((cardSuggestion) => (
          <CardSuggestionOpportunity key={cardSuggestion} />
        ))}
      </div>

      {!showAll && (
        <div className="mt-2.5 flex justify-end">
          <button
            onClick={handleShowMore}
            className="text-sm text-third font-medium duration-200 mr-0.6 bg-transparent hover:cursor-pointer hover:bg-hover-button"
          >
            Ver Outras
          </button>
        </div>
      )}
    </>
  );

  return (
    <>
      {isDesktop && (
        <div className="fixed right-0 top-0 h-screen w-[20vw] z-30 pointer-events-none mr-6 bg-background">
          <div className="flex items-center justify-center mb-2 mt-6">
            <h2 className="text-lg font-semibold text-sidebar-foreground ml-2">
              Sugestões de oportunidade
            </h2>
          </div>
          <div className="flex-1 h-full overflow-y-auto pointer-events-auto">
            <OpportunitiesContent />
          </div>
        </div>
      )}

      {!isDesktop && (
        <div>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-[60] bg-primary hover:bg-primary/90 hover:cursor-pointer pointer-events-auto"
                aria-label="Abrir sugestões de oportunidade"
              >
                <Lightbulb className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[70vw] sm:w-[700px] max-w-[800px]"
            >
              <SheetHeader className="mb-6">
                <SheetTitle>Sugestões de oportunidade</SheetTitle>
                <SheetDescription>
                  Descubra novas oportunidades que podem interessar você
                </SheetDescription>
              </SheetHeader>

              <div
                className="overflow-y-auto h-[calc(100vh-8rem)] px-4"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <style>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <div className="max-w-sm mx-auto space-y-4">
                  <OpportunitiesContent />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </>
  );
};
