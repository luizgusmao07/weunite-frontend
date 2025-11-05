import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Mail, ExternalLink } from "lucide-react";
import { getInitials } from "@/utils/getInitials";
import { useNavigate } from "react-router-dom";
import type { SubscriberDetail } from "@/@types/opportunity.types";

interface OpportunitySubscribersProps {
  subscribers: SubscriberDetail[];
  opportunityTitle: string;
}

export function OpportunitySubscribers({
  subscribers,
  opportunityTitle,
}: OpportunitySubscribersProps) {
  const navigate = useNavigate();

  if (!subscribers || subscribers.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Atletas Inscritos - {opportunityTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg font-medium">
              Nenhum atleta inscrito ainda
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Os atletas que se inscreverem nesta oportunidade aparecerão aqui
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Atletas Inscritos - {opportunityTitle}
          <span className="ml-auto text-sm font-normal text-muted-foreground">
            {subscribers.length}{" "}
            {subscribers.length === 1 ? "atleta" : "atletas"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subscribers.map((subscriber) => {
            const athlete = subscriber.athlete;
            const initials = getInitials(athlete.username || athlete.name);

            return (
              <Card key={subscriber.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={athlete.profileImg}
                        alt={athlete.name}
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{athlete.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        @{athlete.username}
                      </p>
                    </div>
                  </div>

                  {athlete.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{athlete.email}</span>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => navigate(`/profile/${athlete.username}`)}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Perfil
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
