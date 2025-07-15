import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CardSuggestionOpportunity() {
  return (
    <Card className=" shadow-md  transition-shadow duration-200 border-none ">
      <CardHeader>
        <CardTitle className="text-sidebar-foreground font-semibold">Título Oportunidade</CardTitle>
      </CardHeader>

      <CardContent className="mt-[-1em]">
        <CardDescription className="text-sm text-sidebar-foreground mb-3">Descrição da Oportunidade</CardDescription>
        <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          className="text-xs text-thrid bg-transparent hover:cursor-pointer "
        >
          Ver Mais
        </Button>
        </div>
      </CardContent>
    </Card>
  );
}
