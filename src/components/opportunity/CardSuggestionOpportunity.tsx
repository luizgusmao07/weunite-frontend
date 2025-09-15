import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { OpportunityModal } from "./OpportunityDescription";
import type { OpportunityDisplay } from "@/@types/opportunity.types";

export default function CardSuggestionOpportunity() {
  const mockOpportunity: OpportunityDisplay = {
    id: 999,
    title: "Peneira Santos Sub-10",
    description:
      "Esta oportunidade foi criada para atletas que buscam dar um passo adiante em sua carreira esportiva, seja no início de sua jornada ou já em fase de desenvolvimento. O objetivo é oferecer condições que favoreçam não apenas o desempenho esportivo, mas também o crescimento pessoal e profissional do atleta, com foco em resultados, disciplina e visibilidade no cenário esportivo.\n\nO programa proporciona acesso a uma rede de contatos formada por profissionais qualificados, treinadores, preparadores físicos e gestores esportivos, além de criar um ambiente favorável para troca de experiências entre atletas de diferentes modalidades. Através de treinamentos direcionados, acompanhamento técnico e apoio estratégico, os participantes terão a oportunidade de aprimorar suas habilidades, fortalecer aspectos físicos e psicológicos, e desenvolver competências que vão além do esporte, como liderança, trabalho em equipe e resiliência.\n\nOutro diferencial desta oportunidade é a visibilidade oferecida. Atletas terão espaço para mostrar seu talento em competições, eventos esportivos e projetos sociais vinculados, ampliando seu alcance e aumentando suas chances de conquistar patrocínios e convites para novas participações em campeonatos regionais, nacionais ou até internacionais.",
    location: "Estádio Vila Belmiro, Santos - SP",
    dateEnd: new Date("2025-02-06"),
    skills: [
      { id: 1, name: "Futebol" },
      { id: 2, name: "Trabalho em Equipe" },
      { id: 3, name: "Disciplina" },
      { id: 4, name: "Liderança" },
    ],
    company: {
      id: 1,
      name: "Santos FC",
      logo: "",
    },
    subscribers: [],
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-12"),
    companyId: 1,
    companyName: "Santos FC",
    companyLogo: "",
    applicationsCount: 45,
    skillNames: ["Futebol", "Trabalho em Equipe", "Disciplina", "Liderança"],
    isExpired: false,
    daysUntilDeadline: 24,
  };

  return (
    <Card className="bg-card-create shadow-md transition-shadow duration-200 ">
      <CardHeader>
        <CardTitle className="text-card-foreground font-semibold">
          Título Oportunidade
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-[-1em]">
        <CardDescription className="text-sm text-muted-foreground mb-3">
          Descrição da Oportunidade
        </CardDescription>

        <div className="flex justify-end">
          <OpportunityModal
            opportunity={mockOpportunity}
            buttonText="Ver Detalhes"
          />
        </div>
      </CardContent>
    </Card>
  );
}
