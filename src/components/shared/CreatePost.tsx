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
import { useCreatePost } from "@/hooks/usePosts";
import { createPostSchema } from "@/schemas/post/createPost.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

interface CreatePostProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreatePost({ open, onOpenChange }: CreatePostProps) {
  const createPostMutation = useCreatePost();

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      text: "",
      media: null,
    },
  });

  async function onSubmit(values: z.infer<typeof createPostSchema>) {
    const result = await createPostMutation.mutateAsync(values);

    if (result.success) {
      form.reset();
      onOpenChange?.(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Criar nova publicação</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="post-text">
                O que você gostaria de compartilhar?
              </Label>
              <Controller
                name="text"
                control={form.control}
                render={({ field }) => (
                  <Textarea
                    id="post-text"
                    placeholder="Escreva sua mensagem aqui..."
                    className="min-h-[120px]"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="post-image">Adicionar imagem (opcional)</Label>
              <Controller
                name="media"
                control={form.control}
                render={({ field: { onChange, name } }) => (
                  <Input
                    id="post-image"
                    name={name}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      onChange(file);
                    }}
                  />
                )}
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" variant="third">
              Publicar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
