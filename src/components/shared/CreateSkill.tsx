import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface CreatePostProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateSkill({ open, onOpenChange }: CreatePostProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild className="justify-start">
        <Button className="hover:cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Criar Habilidade
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Criar nova habilidade</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="skill-input">
                Qual habilidade você quer adicionar?
              </Label>
              <Input
                id="skill-input"
                placeholder="Ex: React, TypeScript, Design..."
                className="min-h-[50px]"
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" className="hover:cursor-pointer">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="button">Adicionar</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
