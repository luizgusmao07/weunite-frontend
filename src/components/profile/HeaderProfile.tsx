import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ImageUp, Pencil } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import EditProfile from "./EditProfile";
import { useInitials } from "@/hooks/useInitials";
import { useState } from "react";
import Following from "./Following";
import Followers from "./Followers";
import { useBreakpoints } from "@/hooks/useBreakpoints";

export default function HeaderProfile() {
  const { user } = useAuthStore();
  const initials = useInitials(user?.name);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);

  const handleEditProfileOpen = () => {
    setIsEditProfileOpen(true);
  };
  const handleFollowingOpen = () => {
    setIsFollowingOpen(true);
  };

  const handleFollowersOpen = () => {
    setIsFollowersOpen(true);
  };

  const { isDesktop } = useBreakpoints();

  if (isDesktop) {
    return (
      <>
        <EditProfile
          isOpen={isEditProfileOpen}
          onOpenChange={setIsEditProfileOpen}
        />

        <Followers isOpen={isFollowersOpen} onOpenChange={setIsFollowersOpen} />
        <Following isOpen={isFollowingOpen} onOpenChange={setIsFollowingOpen} />

        <div className="w-[48em] mx-auto px-4">
          <div className="relative flex justify-center">
            <img
              className="object-cover rounded-b-sm w-full h-full"
              src="/BannerLinkedin.png"
            />
            <ImageUp className="absolute right-6 text-white top-38 hover:cursor-pointer" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-end justify-between mt-[-50px]">
              <div className="flex items-end gap-8 ml-[1.8em]">
                <div className="relative flex">
                  <Avatar
                    className="w-27 h-27 rounded-full border-5 border-background bg-background"
                    onClick={handleEditProfileOpen}
                  >
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

                <div className="flex flex-col mb-2 -ml-[1.4em]">
                  <p className="text-primary font-medium text-2xl">
                    {user?.username}
                  </p>
                  <p className="text-[#a1a1a1] text-xs">{user?.name}</p>
                </div>
              </div>

              <div className="flex gap-8 text-primary text-sm mb-2">
                <div
                  className="flex flex-col items-center gap-1"
                  onClick={handleFollowingOpen}
                >
                  <p className="hover:cursor-pointer">Seguindo</p>
                  <p className="hover:cursor-pointer font-medium">0</p>
                </div>
                <div
                  className="flex flex-col items-center gap-1"
                  onClick={handleFollowersOpen}
                >
                  <p className="hover:cursor-pointer">Seguidores</p>
                  <p className="hover:cursor-pointer font-medium">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <EditProfile
        isOpen={isEditProfileOpen}
        onOpenChange={setIsEditProfileOpen}
      />
      <Followers isOpen={isFollowersOpen} onOpenChange={setIsFollowersOpen} />
      <Following isOpen={isFollowingOpen} onOpenChange={setIsFollowingOpen} />

      <div className="">
        <div className="h-35 relative">
          <img className="h-full w-full" src="/BannerLinkedin.png" alt="" />
          <ImageUp className="absolute right-4 text-white mb-20 top-27 hover:cursor-pointer" />
        </div>

        <div className="flex w-full">
          <div className="flex w-full">
            <div className="relative flex ml-[0.8em]">
              <Avatar
                className="w-27 h-27 rounded-full border-5 border-background mt-[-50px] bg-background"
                onClick={handleEditProfileOpen}
              >
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

            <div className="flex flex-col ml-[0.5em]">
              <p className="text-primary text-base">{user?.username}</p>
              <p className="text-[#a1a1a1] text-xs">{user?.name}</p>
            </div>
          </div>

          <div className="flex w-full ml-5 mt-1 gap-10 text-primary text-sm justify-center ">
            <div
              className="flex flex-col items-center gap-1"
              onClick={handleFollowingOpen}
            >
              <p className="hover:cursor-pointer">Seguindo</p>
              <p className="hover:cursor-pointer">0</p>
            </div>

            <div
              className="flex flex-col items-center gap-1"
              onClick={handleFollowersOpen}
            >
              <p className="hover:cursor-pointer">Seguidores</p>
              <p className="hover:cursor-pointer">0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
