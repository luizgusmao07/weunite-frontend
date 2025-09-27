import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateOpportunity,
  useGetOpportunities,
} from "@/state/useOpportunities";

interface CreateOpportunityProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateOpportunity({
  open = false,
  onOpenChange,
}: CreateOpportunityProps) {
  const { mutate: createOpportunity, isPending } = useCreateOpportunity();
  const { refetch: refetchOpportunities } = useGetOpportunities();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    salary: "",
    skills: "",
    applicationDeadline: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Converter skills de string para objetos Skill
    const skillsArray = formData.skills
      .split(",")
      .map((skill, index) => ({
        id: index + 1,
        name: skill.trim(),
      }))
      .filter((skill) => skill.name);

    const opportunityData = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      dateEnd: formData.applicationDeadline
        ? new Date(formData.applicationDeadline)
        : new Date(),
      skills: skillsArray,
    };

    console.log("Form submitted with data:", opportunityData);

    createOpportunity(
      {
        data: opportunityData,
        companyId: 1, // Por enquanto, usar um ID fixo
      },
      {
        onSuccess: () => {
          console.log("Oportunidade criada com sucesso!");
          setFormData({
            title: "",
            company: "",
            description: "",
            location: "",
            salary: "",
            skills: "",
            applicationDeadline: "",
          });
          onOpenChange?.(false);
          refetchOpportunities();
        },
        onError: (error) => {
          console.error("Error creating opportunity:", error);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Nova Oportunidade</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título da Vaga</Label>
              <Input
                id="title"
                placeholder="Ex: Desenvolvedor Frontend"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                placeholder="Nome da empresa"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva a oportunidade..."
              className="resize-none"
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Localização</Label>
              <Input
                id="location"
                placeholder="Ex: São Paulo, SP"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">Salário</Label>
              <Input
                id="salary"
                placeholder="Ex: R$ 5.000"
                value={formData.salary}
                onChange={(e) => handleInputChange("salary", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="skills">Habilidades Requeridas</Label>
              <Input
                id="skills"
                placeholder="Ex: React, TypeScript, Node.js"
                value={formData.skills}
                onChange={(e) => handleInputChange("skills", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="applicationDeadline">
                Data Limite de Inscrição
              </Label>
              <Input
                id="applicationDeadline"
                type="date"
                value={formData.applicationDeadline}
                onChange={(e) =>
                  handleInputChange("applicationDeadline", e.target.value)
                }
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange?.(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending} className="flex-1">
              {isPending ? "Criando..." : "Criar Oportunidade"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
