import { Button } from "@/components/ui/button"
import {Dialog,DialogClose,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CreatePostProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreatePost({ open, onOpenChange }: CreatePostProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Criar nova publicação</DialogTitle>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="post-content">O que você gostaria de compartilhar?</Label>
              <Textarea 
                id="post-content" 
                placeholder="Escreva sua mensagem aqui..."
                className="min-h-[120px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="post-image">Adicionar imagem (opcional)</Label>
              <Input id="post-image" type="file" accept="image/*" />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" variant="third">Publicar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}