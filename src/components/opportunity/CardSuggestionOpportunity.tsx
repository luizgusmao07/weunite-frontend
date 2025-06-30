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
    <Card className="bg-card-create shadow-md  transition-shadow duration-200 border border-gray-200">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-gray-900">Título Oportunidade</CardTitle>
      </CardHeader>

      <CardContent className="mt-[-1em]">
        <CardDescription className="text-sm text-gray-600 mb-3">Descrição da Oportunidade</CardDescription>
        <Button
          variant="outline"
          size="sm"
          className="text-xs text-thrid hover:bg-gray-50"
        >
          Ver Mais
        </Button>
      </CardContent>
    </Card>
  );
}
