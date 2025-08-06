import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/stores/useAuthStore"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Pencil } from "lucide-react"

export default function EditProfile() {

    const { user } = useAuthStore();

    return (
        <Dialog>
            <form>
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
                            <Avatar className='w-27 h-27 rounded-full'>
                                <AvatarImage
                                    src="/cori.jpeg"
                                    alt="Foto de perfil"
                                    className='w-full h-full rounded-full object-cover hover:cursor-pointer'
                                />
                                <AvatarFallback className='w-full h-full flex items-center border-1 rounded-full justify-center text-primary text-5xl '>
                                    CN
                                </AvatarFallback>

                            </Avatar>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Nome</Label>
                            <Input id="name-1" name="name" defaultValue={user?.name} />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Username</Label>
                            <Input id="username-1" name="username" defaultValue={user?.username} />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="email-1">Email</Label>
                            <Input id="email-1" name="email" defaultValue={user?.email} />
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
    )
}