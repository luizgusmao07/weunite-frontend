import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";
import { useInitials } from "@/hooks/useInitials";
import { useAuthStore } from "@/stores/useAuthStore";

export default function CardFollowing() {
  const { user } = useAuthStore();
  const initials = useInitials(user?.name);

  return (
    <CardContent className="flex mt-5">
      <div className="flex gap-2 items-center">
        <Avatar className="w-13 h-13 rounded-full">
          <AvatarImage
            src={user?.profileImg}
            alt="Foto de perfil"
            className="w-full h-full rounded-full object-cover hover:cursor-pointer"
          />
          <AvatarFallback className="w-full h-full flex items-center border-1 border-primary rounded-full justify-center text-primary text-5xl ">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col  items-start justify-center">
          <p className="text-primary font-medium">{user?.username}</p>
          <p className="text-[#a1a1a1] text-xs">{user?.name}</p>
        </div>
      </div>

      <div className="ml-auto flex items-center">
        <Button variant="outline" className="text-xs font-normal">Deixar de seguir</Button>
      </div>
    </CardContent>
  );
}
