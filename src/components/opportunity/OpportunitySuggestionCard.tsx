import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import type { Opportunity } from "@/@types/opportunity.types";
import { getInitials } from "@/utils/getInitials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export default function OpportunitySuggestionCard({
  opportunity,
}: OpportunityCardProps) {
  const initials = getInitials(opportunity.company?.username || "");
  return (
    <Card className="w-[16rem] flex-shrink-0">
      <CardHeader>
        <Avatar className="hover:cursor-pointer h-[2.8em] w-[2.8em]">
          <AvatarImage
            src={opportunity.company?.profileImg}
            alt="company logo"
          />
          <AvatarFallback className="bg-third/10 text-third font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <CardTitle>Oportunidade Titulo</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Descrição</p>
      </CardContent>
      <CardFooter>
        <Button>Veja Mais</Button>
      </CardFooter>
    </Card>
  );
}
