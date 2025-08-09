import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPostSchema } from "@/schemas/post/createPost.schema";
import { useAuthStore } from "@/stores/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";

import { useState } from "react";
import { useUpdateProfile } from "@/state/useUsers";
import { updateProfileSchema, type UpdateProfileForm } from "@/schemas/updateProfile.schema";

export default function EditProfile({ }) {
  const { user } = useAuthStore();
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<UpdateProfileForm>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name,
      username: user?.username,
      email: user?.email,
      media: null,
    },
  });

  const handleFile = (file?: File) => {
    if (!file) return;
    form.setValue("media", file);
    const url = URL.createObjectURL(file);
    setPreview((old) => {
      if (old) URL.revokeObjectURL(old);
      return url;
    });
  };

  const updateProfileMutation = useUpdateProfile();

  async function onSubmit(values: UpdateProfileForm) {
    if (!user?.id) return;

    const result = await updateProfileMutation.mutateAsync({
      data: {
        name: values.name.trim(),
        username: values.username.trim(),
        email: values.email.trim(),
        profileImg: values?.media || undefined,
      },
      username: user.username,
    });

    if (result.success) {
      form.reset({...values, media: null});
    }
  }

  return (
    <>
      <Dialog>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogTrigger asChild>
            <Pencil className="h-4 w-4 text-black cursor-pointer rotate-90" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Perfil</DialogTitle>
              <DialogDescription>
                Faça as alterações necessárias no seu perfil.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <div className=" grid gap-3 justify-center">
                <Controller
                  name="media"
                  control={form.control}
                  render={() => (
                    <div>
                      <Input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFile(e.target.files?.[0])}
                      />

                      <label
                        htmlFor="avatar-upload"
                        className="relative group cursor-pointer"
                      >
                        <Avatar className="w-28 h-28 rounded-full">
                          <AvatarImage
                            src={
                              user?.profileImg || preview || "/placeholder.png"
                            }
                            alt="Foto de perfil"
                            className="object-cover"
                          />
                          <AvatarFallback className="text-xl">
                            {user?.name?.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-white font-medium transition-opacity">
                          Alterar
                        </div>
                      </label>
                    </div>
                  )}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="name-1">Nome</Label>
                <Input id="name" {...form.register("name")} defaultValue={user?.name} />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="username-1">Username</Label>
                <Input
                  id="username"
                  {...form.register("username")}
                  defaultValue={user?.username}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="bio-1">Email</Label>
                <Input id="email" {...form.register("email")} defaultValue={user?.email} />
              </div>
            </div>

            <DialogFooter className="flex flex-row-reverse gap-2">
              <Button type="submit">Salvar</Button>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
