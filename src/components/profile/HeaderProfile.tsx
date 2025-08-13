import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ImageUp, Pencil } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import EditProfile from "./EditProfile";
import { useInitials } from "@/hooks/useInitials";
import { useState } from "react";

export default function HeaderProfile() {
  const { isDesktop, isTablet } = useBreakpoints();

  const { user } = useAuthStore();
  const initials = useInitials(user?.name);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleEditProfileOpen = () => {
    setIsEditProfileOpen(true);
  };

  return (
    <>
      <EditProfile isOpen={isEditProfileOpen} onOpenChange={setIsEditProfileOpen} />
      
      <div>
        <div className={`h-28 sm:h-32 md:h-35 lg:h-44 xl:h-40 relative ${isDesktop ? 'flex justify-center' : ''}`}>
          <img className={`h-full w-full object-cover rounded-b-sm ${isDesktop ? 'max-w-2xl' : ''}`} src="/BannerLinkedin.png"/>
          <ImageUp className="absolute right-110 text-white mb-50 top-32 hover:cursor-pointer" />
        </div>

        <div className={`${isDesktop ? 'flex flex-col px-115' : `flex w-full ${isTablet ? 'px-4' : ''}`}`}>
          <div className={`${isDesktop ? 'flex items-end justify-between mt-[-50px]' : 'flex items-end gap-3 ml-2 mt-[-50px]'}`}>
            <div className="flex items-end gap-8">
              {/* foto */}
              <div className="relative flex">
                <Avatar className={`w-27 h-27 rounded-full border-5 border-background bg-background`} onClick={handleEditProfileOpen}>
                  <AvatarImage
                    src={user?.profileImg}
                    alt="Foto de perfil"
                    className="w-full h-full rounded-full object-cover hover:cursor-pointer"
                  />
                  <AvatarFallback className="w-full h-full flex items-center border-1 border-primary rounded-full justify-center text-primary text-5xl ">
                    {initials}
                  </AvatarFallback>

                  <div className="absolute bottom-2 right-0 bg-[#a1a1a1] rounded-full p-1 border border-gray-200 shadow-sm">
                    <Pencil className="h-4 w-4 text-white cursor-pointer" />
                  </div>
                </Avatar>
              </div>

              {/* info usuário */}
              <div className={`${isDesktop ? 'flex flex-col mb-2' : 'flex flex-col mb-2'}`}>
                <p className={`text-primary font-medium ${isDesktop ? 'text-2xl' : 'text-base'}`}>{user?.username}</p>
                <p className="text-[#a1a1a1] text-xs">{user?.name}</p>
              </div>
            </div>

            {/* seguidores desktop */}
            {isDesktop && (
              <div className="flex gap-15 text-primary text-sm mb-2">
                <div className="flex flex-col items-center gap-1">
                  <p className="hover:cursor-pointer">Seguindo</p>
                  <p className="hover:cursor-pointer font-medium">0</p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <p className="hover:cursor-pointer">Seguidores</p>
                  <p className="hover:cursor-pointer font-medium">0</p>
                </div>
              </div>
            )}
          </div>

          {/* seguimores */}
          {!isDesktop && (
            <div className="flex ml-auto gap-8 text-primary text-sm items-end pb-3">
              <div className="flex flex-col items-center gap-1">
                <p className="hover:cursor-pointer">Seguindo</p>
                <p className="hover:cursor-pointer font-medium">0</p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <p className="hover:cursor-pointer">Seguidores</p>
                <p className="hover:cursor-pointer font-medium">0</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
