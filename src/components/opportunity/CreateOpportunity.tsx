import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/stores/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createOpportunitySchema } from "@/schemas/opportunity/createOpportunity.schema";
import { useCreateOpportunity } from "@/state/useOpportunities";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateOpportunityProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateOpportunity({
  open,
  onOpenChange,
}: CreateOpportunityProps) {
  const form = useForm<z.infer<typeof createOpportunitySchema>>({
    resolver: zodResolver(createOpportunitySchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      dateEnd: new Date(),
      skills: [],
    },
  });

  const { user } = useAuthStore();

  const createOpportunityMutation = useCreateOpportunity();

  async function onSubmit(values: z.infer<typeof createOpportunitySchema>) {
    if (!user?.id) return;

    const result = await createOpportunityMutation.mutateAsync({
      data: {
        ...values,
        skills: values.skills.map((skillName, index) => ({
          id: index + 1,
          name: skillName,
        })),
      },
      companyId: Number(user.id),
    });
    if (result.success) {
      form.reset({
        title: "",
        description: "",
        location: "",
        dateEnd: new Date(),
        skills: [],
      });
      onOpenChange?.(false);
    }
  }

  const isSubmitting = createOpportunityMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[450px] max-h-[80vh] overflow-y-auto"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Criar nova oportunidade</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="opportunity-title">Título da oportunidade</Label>
            <Controller
              name="title"
              control={form.control}
              render={({ field }) => (
                <Textarea
                  id="opportunity-title"
                  placeholder="Ex: Oportunidade para lateral esquerdo"
                  className="min-h-[60px] resize-none"
                  {...field}
                />
              )}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="opportunity-description">
              Descrição da oportunidade
            </Label>
            <Controller
              name="description"
              control={form.control}
              render={({ field }) => (
                <Textarea
                  id="opportunity-description"
                  placeholder="Descreva a oportunidade, requisitos, benefícios..."
                  className="min-h-[80px] resize-none"
                  {...field}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="opportunity-location">Localização</Label>
              <Controller
                name="location"
                control={form.control}
                render={({ field }) => (
                  <Input
                    id="opportunity-location"
                    placeholder="Ex: São Paulo, SP"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="opportunity-dateEnd">Data limite</Label>
              <Controller
                name="dateEnd"
                control={form.control}
                render={({ field }) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-between text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <div className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </div>
                        <ChevronDownIcon className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        fixedWeeks={true}
                        initialFocus
                        locale={ptBR}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              />
            </div>
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
                  placeholder="Ex: Lateral esquerdo, perna direita"
                  value={field.value.join(", ")}
                  onChange={(e) => {
                    const skillsArray = e.target.value
                      .split(",")
                      .map((skill) => skill.trim())
                      .filter((skill) => skill.length > 0);
                    field.onChange(skillsArray);
                  }}
                />
              )}
            />
          </div>

          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button variant="outline" className="hover:cursor-pointer">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="variant-third bg-third hover:bg-third-hover"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? "Criando oportunidade..." : "Criar Oportunidade"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
