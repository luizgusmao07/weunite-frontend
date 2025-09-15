import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  Plus,
  X,
  MapPin,
  Building2,
  Users,
  Loader2,
} from "lucide-react";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import type { Skill } from "@/@types/opportunity.types";
import { skillOptions, locationOptions } from "@/constants/opportunityOptions";
import { createOpportunitySchema } from "@/schemas/opportunity/createOpportunity.schema";

type CreateOpportunityFormData = z.infer<typeof createOpportunitySchema>;

interface CreateOpportunityProps {
  children?: React.ReactNode;
  onSubmit?: (data: CreateOpportunityFormData) => Promise<void>;
}

export function CreateOpportunity({
  children,
  onSubmit,
}: CreateOpportunityProps) {
  const { isDesktop } = useBreakpoints();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [dateEnd, setDateEnd] = useState<Date>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateOpportunityFormData>({
    resolver: zodResolver(createOpportunitySchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      skills: [],
    },
  });

  const handleFormSubmit = async (data: CreateOpportunityFormData) => {
    if (!onSubmit) return;

    const submitData = {
      ...data,
      location: selectedLocation,
      skills: selectedSkills,
      dateEnd: dateEnd!,
    };

    setIsSubmitting(true);
    try {
      await onSubmit(submitData);
      reset();
      setSelectedLocation("");
      setSelectedSkills([]);
      setDateEnd(undefined);
      setOpen(false);
    } catch (error) {
      // Handle error silently or show user-friendly error message
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSkill = (skill: Skill) => {
    if (!selectedSkills.find((s) => s.id === skill.id)) {
      const newSkills = [...selectedSkills, skill];
      setSelectedSkills(newSkills);
      setValue("skills", newSkills);
    }
  };

  const removeSkill = (skillId: number) => {
    const newSkills = selectedSkills.filter((s) => s.id !== skillId);
    setSelectedSkills(newSkills);
    setValue("skills", newSkills);
  };

  const CreateForm = () => (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label
          htmlFor="title"
          className="text-sm font-medium flex items-center gap-2"
        >
          <Building2 className="h-4 w-4" />
          Título da Oportunidade
        </Label>
        <Input
          id="title"
          placeholder="Ex: Desenvolvedor Frontend Júnior"
          {...register("title")}
          className={cn(errors.title && "border-red-500")}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Descrição
        </Label>
        <Textarea
          id="description"
          placeholder="Descreva a oportunidade, responsabilidades e requisitos..."
          rows={4}
          {...register("description")}
          className={cn(errors.description && "border-red-500")}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Localização
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !selectedLocation && "text-muted-foreground",
                errors.location && "border-red-500",
              )}
            >
              {selectedLocation || "Selecione a localização"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0">
            <div className="max-h-60 overflow-auto">
              {locationOptions.map((location) => (
                <Button
                  key={location}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setSelectedLocation(location);
                    setValue("location", location);
                  }}
                >
                  {location}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        {errors.location && (
          <p className="text-sm text-red-500">{errors.location.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          Data de Término
        </Label>
        <Input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            const date = new Date(e.target.value);
            setDateEnd(date);
            setValue("dateEnd", date);
          }}
          className={cn(errors.dateEnd && "border-red-500")}
        />
        {errors.dateEnd && (
          <p className="text-sm text-red-500">{errors.dateEnd.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Users className="h-4 w-4" />
          Habilidades Necessárias
        </Label>

        {selectedSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 bg-muted/30 rounded-lg">
            {selectedSkills.map((skill) => (
              <Badge
                key={skill.id}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {skill.name}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-red-500"
                  onClick={() => removeSkill(skill.id)}
                />
              </Badge>
            ))}
          </div>
        )}

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                errors.skills && "border-red-500",
              )}
            >
              Adicionar habilidade
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0">
            <div className="max-h-60 overflow-auto">
              {skillOptions
                .filter(
                  (skill) => !selectedSkills.find((s) => s.id === skill.id),
                )
                .map((skill) => (
                  <Button
                    key={skill.id}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => addSkill(skill)}
                  >
                    {skill.name}
                  </Button>
                ))}
            </div>
          </PopoverContent>
        </Popover>

        {errors.skills && (
          <p className="text-sm text-red-500">{errors.skills.message}</p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setOpen(false)}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-third to-green-500 hover:from-green-500 hover:to-emerald-500"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Criando...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Criar Oportunidade
            </>
          )}
        </Button>
      </div>
    </form>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children || (
            <Button className="bg-gradient-to-r from-third to-green-500 hover:from-green-500 hover:to-emerald-500">
              <Plus className="mr-2 h-4 w-4" />
              Nova Oportunidade
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-third" />
              Criar Nova Oportunidade
            </DialogTitle>
            <DialogDescription>
              Crie uma nova oportunidade para atrair os melhores talentos para
              sua empresa.
            </DialogDescription>
          </DialogHeader>
          <CreateForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children || (
          <Button className="bg-gradient-to-r from-third to-green-500 hover:from-green-500 hover:to-emerald-500">
            <Plus className="mr-2 h-4 w-4" />
            Nova Oportunidade
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent className="max-h-[95vh]">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-third" />
            Criar Nova Oportunidade
          </DrawerTitle>
          <DrawerDescription>
            Crie uma nova oportunidade para atrair os melhores talentos para sua
            empresa.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4 overflow-y-auto">
          <CreateForm />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
