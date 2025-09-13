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
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronDownIcon, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { createOpportunitySchema } from "@/schemas/opportunity/opportunity.schema";
import { CreateSkill } from "../shared/CreateSkill";

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
      date: undefined,
      skills: "",
    },
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const onSubmit = (data: z.infer<typeof createOpportunitySchema>) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="hover:cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Criar Oportunidade
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Adicionar Oportunidade</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="title">Titulo</Label>
              <Controller
                name="title"
                control={form.control}
                render={({ field }) => (
                  <Input id="title" placeholder="Adicionar titulo" {...field} />
                )}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Controller
                name="description"
                control={form.control}
                render={({ field }) => (
                  <Input
                    id="description"
                    placeholder="Adicionar descrição detalhada"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Local</Label>
              <Controller
                name="location"
                control={form.control}
                render={({ field }) => (
                  <Input
                    id="location"
                    placeholder="Adicione um endereço do local"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Controller
                name="date"
                control={form.control}
                render={({ field }) => (
                  <>
                    <Label htmlFor="date" className="px-1">
                      Data da oportunidade
                    </Label>
                    <Popover
                      open={isCalendarOpen}
                      onOpenChange={setIsCalendarOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date"
                          className="w-full justify-between font-normal"
                        >
                          {field.value ? field.value.toLocaleDateString() : "Selecione a data"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            field.onChange(date);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </>
                )}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="skills">Habilidades</Label>
              <CreateSkill />
              <Controller
                name="skills"
                control={form.control}
                render={({ field }) => (
                  <Input
                    id="skills"
                    placeholder="Adicionar habilidades"
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" className="hover:cursor-pointer">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit">Publicar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}