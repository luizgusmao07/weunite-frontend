import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Users, Calendar, MapPin, Briefcase } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  useGetOpportunitiesCompany,
  useGetOpportunitySubscribers,
} from "@/state/useOpportunities";
import { OpportunitySubscribers } from "@/components/opportunity/OpportunitySubscribers";
import type { Opportunity } from "@/@types/opportunity.types";

export function MyOpportunities() {
  const { user } = useAuthStore();
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null);
  const [isSubscribersOpen, setIsSubscribersOpen] = useState(false);

  const { data: opportunitiesResponse, isLoading } = useGetOpportunitiesCompany(
    Number(user?.id),
  );

  const { data: subscribersResponse, isLoading: isLoadingSubscribers } =
    useGetOpportunitySubscribers(
      Number(user?.id),
      Number(selectedOpportunity?.id),
      !!selectedOpportunity,
    );

  const opportunities = opportunitiesResponse?.data || [];

  const handleViewSubscribers = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsSubscribersOpen(true);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  if (!opportunities || opportunities.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Minhas Oportunidades</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie suas oportunidades e veja quem se inscreveu
          </p>
        </div>

        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Briefcase className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-muted-foreground mb-2">
              Você ainda não criou nenhuma oportunidade
            </p>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Crie sua primeira oportunidade para começar a receber inscrições
              de atletas interessados
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Minhas Oportunidades</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie suas oportunidades e veja quem se inscreveu
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {opportunities.map((opportunity: Opportunity) => {
          // Precisamos buscar os subscribers do backend quando necessário
          const subscribersCount = 0; // Temporariamente fixo em 0 até implementar busca de subscribers
          const deadlineDate = new Date(opportunity.dateEnd).toLocaleDateString(
            "pt-BR",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
            },
          );

          return (
            <Card
              key={opportunity.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="line-clamp-2">
                  {opportunity.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {opportunity.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{opportunity.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  <span>Prazo: {deadlineDate}</span>
                </div>

                {opportunity.skills && opportunity.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {opportunity.skills
                      .slice(0, 3)
                      .map((skill: { id: number; name: string }) => (
                        <Badge key={skill.id} variant="secondary">
                          {skill.name}
                        </Badge>
                      ))}
                    {opportunity.skills.length > 3 && (
                      <Badge variant="secondary">
                        +{opportunity.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-lg">
                        {subscribersCount}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {subscribersCount === 1 ? "inscrito" : "inscritos"}
                    </span>
                  </div>

                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => handleViewSubscribers(opportunity)}
                    disabled={subscribersCount === 0}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Ver Inscritos
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={isSubscribersOpen} onOpenChange={setIsSubscribersOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Atletas Inscritos</DialogTitle>
          </DialogHeader>

          {isLoadingSubscribers ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-40" />
              ))}
            </div>
          ) : (
            <OpportunitySubscribers
              subscribers={subscribersResponse?.data || []}
              opportunityTitle={selectedOpportunity?.title || ""}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
