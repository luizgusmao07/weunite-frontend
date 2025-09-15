import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users } from "lucide-react";
import type { OpportunityDisplay } from "@/@types/opportunity.types";
import { getTimeAgo } from "@/hooks/useGetTimeAgo";
import { getInitials } from "@/utils/getInitials";
import { OpportunityModal } from "./OpportunityDescription";

interface OpportunityCardProps {
  opportunity: OpportunityDisplay;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const timeAgo = getTimeAgo(opportunity.createdAt);

  const opportunityDate = useMemo(
    () =>
      new Date(opportunity.dateEnd).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    [opportunity.dateEnd],
  );

  return (
    <Card className="w-full max-w-[500px] mb-3 hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={opportunity.companyLogo}
              alt={opportunity.companyName}
            />
            <AvatarFallback className="bg-third/10 text-third font-semibold text-xs">
              {getInitials(opportunity.companyName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xs font-semibold text-card-foreground truncate">
              {opportunity.companyName}
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              {timeAgo}
            </CardDescription>
          </div>
        </div>
        <CardAction>
          <OpportunityModal
            opportunity={opportunity}
            buttonText="Detalhes"
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs"
          />
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-2 py-3">
        <div>
          <h3 className="text-sm font-bold text-card-foreground mb-1 line-clamp-1">
            {opportunity.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 flex-shrink-0" />
          <span className="truncate flex-1">{opportunity.location}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 flex-shrink-0" />
            <span>Até {opportunityDate}</span>
          </div>
          {opportunity.applicationsCount > 0 && (
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 flex-shrink-0" />
              <span>{opportunity.applicationsCount}</span>
            </div>
          )}
        </div>

        {opportunity.skillNames && opportunity.skillNames.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {opportunity.skillNames.slice(0, 2).map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-1.5 py-0.5 bg-third/10 text-third hover:bg-third/20"
              >
                {skill}
              </Badge>
            ))}
            {opportunity.skillNames.length > 2 && (
              <Badge
                variant="secondary"
                className="text-xs px-1.5 py-0.5 bg-muted text-muted-foreground"
              >
                +{opportunity.skillNames.length - 2}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
