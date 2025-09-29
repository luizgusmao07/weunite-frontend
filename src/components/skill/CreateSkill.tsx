import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DrawerTrigger } from "../ui/drawer";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";

export default function CreateSkill() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <Button
          variant="outline"
          className="w-full justify-start text-sm font-normal border-none"
        >
          <Plus />
          Adicionar Habilidade
        </Button>
      </DrawerTrigger>

      <DialogContent>
        <DialogHeader>Adicionar Habilidade</DialogHeader>
        <ProfileForm />
      </DialogContent>
    </Dialog>
  );

  function ProfileForm({ className }: React.ComponentProps<"form">) {
    return (
      <form className="grid items-start gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">Nome Habilidade</Label>
          <Input id="username" defaultValue="@shadcn" />
        </div>
        <Button type="submit">Save changes</Button>
      </form>
    );
  }
}
