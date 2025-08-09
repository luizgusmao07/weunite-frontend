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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useUpdateProfile } from "@/state/useUsers";
import {
  updateProfileSchema,
  type UpdateProfileForm,
} from "@/schemas/updateProfile.schema";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { data } from "react-router-dom";

export default function EditProfile() {
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

  const handleFile = (file?: File | null) => {
    if (!file) {
      form.setValue("media", null);
      return;
    }
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

    console.log(result)

    if (result.success) {
      form.reset({ ...values, media: null });
    }
  }

  return (
    <>
      <Dialog>
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

          {/* Form precisa estar DENTRO do DialogContent */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                {/* Upload do Avatar */}
                <div className="grid gap-3 justify-center">
                  <FormField
                    control={form.control}
                    name="media"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <>
                            <Input
                              id="avatar-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                handleFile(file);
                                field.onChange(file);
                              }}
                            />
                            <label
                              htmlFor="avatar-upload"
                              className="relative group cursor-pointer"
                            >
                              <Avatar className="w-28 h-28 rounded-full">
                                <AvatarImage
                                  src={preview || user?.profileImg || "/placeholder.png"}
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
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Nome */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid gap-3">
                      <FormLabel htmlFor="name">Nome</FormLabel>
                      <FormControl>
                        <Input id="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="grid gap-3">
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <FormControl>
                        <Input id="username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-3">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input id="email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="flex flex-row-reverse gap-2">
                <Button type="submit">Salvar</Button>
                <DialogClose asChild>
                  <Button variant="outline" type="button">Cancelar</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}