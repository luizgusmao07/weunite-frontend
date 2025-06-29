import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface Opportunity {
  id: string;
  title: string;
  description: string;
  image?: string;
}

const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Peneira São Paulo FC',
    description: 'Venha participar da peneira do São Paulo FC, o maior clube deste país. Inscrições abertas até 30/06.',
  },
  {
    id: '2',
    title: 'Peneira FC Barcelona',
    description: 'Peneira aberta para jogadores de 16-18 anos. Inscrições até 15/07.',
  },
  {
    id: '3',
    title: 'Teste Santos FC',
    description: 'Teste para categoria sub-20. Próxima data: 20/07/2025.',
  },
  {
    id: '4',
    title: 'Academia Real Madrid',
    description: 'Seleção para academia de formação. Vagas limitadas.',
  },
  {
    id: '5',
    title: 'Clube Juventude',
    description: 'Peneira para time juvenil. Todas as posições.',
  },
];

export const OpportunitiesSidebar: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [visibleOpportunities, setVisibleOpportunities] = useState(1);

  const handleShowMore = () => {
    if (!showAll) {
      setShowAll(true);
      setVisibleOpportunities(mockOpportunities.length);
    }
  };

  const handleClose = () => {
    setShowAll(false);
    setVisibleOpportunities(1);
  };

  const displayedOpportunities = mockOpportunities.slice(0, visibleOpportunities);

  return (
    <div className="fixed right-0 top-0 h-screen w-80 z-10 pointer-events-none">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 pointer-events-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Sugestões de oportunidade
            </h2>
            {showAll && (
              <button
                onClick={handleClose}
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                fechar
              </button>
            )}
          </div>
        </div>

        {/* Cards Container */}
        <div className="flex-1 overflow-hidden pointer-events-auto">
          <div 
            className={`px-4 pb-4 h-full ${
              showAll 
                ? 'overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400' 
                : 'overflow-hidden'
            }`}
            style={{
              scrollbarWidth: 'thin',
              scrollbarGutter: 'stable overlay',
            }}
          >
            <div className="space-y-4">
              {displayedOpportunities.map((opportunity) => (
                <Card 
                  key={opportunity.id} 
                  className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-gray-900">
                      {opportunity.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm text-gray-600 mb-3">
                      {opportunity.description}
                    </CardDescription>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      ver mais
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Show More Button */}
            {!showAll && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleShowMore}
                  className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                >
                  ver outras
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-thin::-webkit-scrollbar {
            width: 8px;
          }
          .scrollbar-thin::-webkit-scrollbar-track {
            background: transparent;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb {
            background-color: #d1d5db;
            border-radius: 4px;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb:hover {
            background-color: #9ca3af;
          }
        `
      }} />
    </div>
  );
};