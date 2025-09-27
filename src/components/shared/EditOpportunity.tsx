import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { useUpdateOpportunity } from "@/state/useOpportunities";
import { createOpportunitySchema } from "@/schemas/opportunity/createOpportunity.schema";
import { useAuthStore } from "@/stores/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import type { Opportunity, Skill } from "@/@types/opportunity.types";
import { useEffect, useState } from "react";
import { Loader2, X, CalendarIcon } from "lucide-react";
import { skillOptions } from "@/constants/opportunityOptions";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface EditOpportunityProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  opportunity?: Opportunity;
}

export function EditOpportunity({
  open,
  onOpenChange,
  opportunity,
}: EditOpportunityProps) {
  const form = useForm<z.infer<typeof createOpportunitySchema>>({
    resolver: zodResolver(createOpportunitySchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      skills: "",
    },
  });

  const { user } = useAuthStore();
  // const updateOpportunityMutation = useUpdateOpportunity();

  useEffect(() => {
    if (opportunity && open) {
      form.reset({
        title: opportunity.title || "",
        description: opportunity.description || "",
        location: opportunity.location || "",
        skills: opportunity.skills?.map((skill) => skill.name).join(", ") || "",
      });
    }
  }, [opportunity, open, form]);

  async function onSubmit(values: z.infer<typeof createOpportunitySchema>) {
    if (!user?.id || !opportunity?.id) return;

    // Converte string de skills para array
    const skillsArray = values.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0)
      .map((skillName, index) => ({
        id: index + 1,
        name: skillName,
      }));

    const submitData = {
      ...values,
      skills: skillsArray,
      dateEnd: opportunity.dateEnd, // Mantém a data original por enquanto
    };

    // TODO: Implementar updateOpportunityMutation
    // const result = await updateOpportunityMutation.mutateAsync({
    //   data: submitData,
    //   userId: Number(user.id),
    //   opportunityId: Number(opportunity.id),
    // });

    // if (result.success) {
    form.reset();
    onOpenChange?.(false);
    // }
  }

  const isSubmitting = false; // updateOpportunityMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Editar oportunidade</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="opportunity-title">Título da oportunidade</Label>
              <Controller
                name="title"
                control={form.control}
                render={({ field }) => (
                  <Input
                    id="opportunity-title"
                    placeholder="Ex: Desenvolvedor Frontend React"
                    {...field}
                  />
                )}
              />
              {form.formState.errors.title && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="opportunity-description">Descrição</Label>
              <Controller
                name="description"
                control={form.control}
                render={({ field }) => (
                  <Textarea
                    id="opportunity-description"
                    placeholder="Descreva a oportunidade, requisitos e benefícios..."
                    className="min-h-[150px]"
                    {...field}
                  />
                )}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="opportunity-location">Localização</Label>
              <Controller
                name="location"
                control={form.control}
                render={({ field }) => (
                  <Input
                    id="opportunity-location"
                    placeholder="Ex: São Paulo, SP - Remoto"
                    {...field}
                  />
                )}
              />
              {form.formState.errors.location && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.location.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="opportunity-skills">
                Habilidades (separadas por vírgula)
              </Label>
              <Controller
                name="skills"
                control={form.control}
                render={({ field }) => (
                  <Input
                    id="opportunity-skills"
                    placeholder="Ex: React, TypeScript, Node.js"
                    {...field}
                  />
                )}
              />
              {form.formState.errors.skills && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.skills.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar alterações"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
