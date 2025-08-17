import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ImageUp, Pencil } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import EditProfile from "./EditProfile";
import { useInitials } from "@/hooks/useInitials";
import { useState } from "react";
import Following from "./Following";
import Followers from "./Followers";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";

interface HeaderProfileProps {
  profileUsername?: string;
}

export default function HeaderProfile({ profileUsername }: HeaderProfileProps) {
  const { user } = useAuthStore();
  const { data: profileUser } = useUserProfile(profileUsername);

  console.log("🔍 Debug:", {
    profileUsername,
    authUser: user?.username,
    profileUser,
  });

  const isOwnProfile = !profileUsername || profileUsername === user?.username;
  const displayUser = isOwnProfile ? user : profileUser;
  console.log("👤 Display User:", displayUser);

  const initials = useInitials(displayUser?.name);

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
        {isOwnProfile && (
          <EditProfile
            isOpen={isEditProfileOpen}
            onOpenChange={setIsEditProfileOpen}
          />
        )}

        <Followers isOpen={isFollowersOpen} onOpenChange={setIsFollowersOpen} />
        <Following isOpen={isFollowingOpen} onOpenChange={setIsFollowingOpen} />

        <div className="w-[48em] mx-auto px-4">
          <div className="h-40 relative">
            <img
              className="object-cover rounded-b-sm w-full h-full"
              src="/BannerLinkedin.png"
            />
            {isOwnProfile && (
              <ImageUp className="absolute right-6 text-white top-27 hover:cursor-pointer" />
            )}
          </div>

          <div className="flex flex-col w-full">
            <div className="flex w-full">
              <div className="relative flex ml-[0.8em]">
                <Avatar
                  className="w-27 h-27 rounded-full border-5 border-background mt-[-50px] bg-background"
                  onClick={handleEditProfileOpen}
                >
                  <AvatarImage
                    src={displayUser?.profileImg}
                    alt="Foto de perfil"
                    className="w-full h-full rounded-full object-cover hover:cursor-pointer"
                  />
                  <AvatarFallback className="w-full h-full flex items-center border-1 border-primary rounded-full justify-center text-primary text-5xl ">
                    {initials}
                  </AvatarFallback>
                  {isOwnProfile && (
                    <div className="absolute bottom-2 right-0 bg-background rounded-full p-1 border border-primary shadow-sm">
                      <Pencil className="h-4 w-4 text-primary cursor-pointer rotate-90" />
                    </div>
                  )}
                </Avatar>
              </div>

              <div className="flex flex-col ml-[0.5em]">
                <p className="text-primary font-medium text-2xl">
                  {displayUser?.username}
                </p>
                <p className="text-[#a1a1a1] text-xs">{displayUser?.name}</p>
              </div>

              <div className="ml-auto mr-4 mt-2 gap-3 flex">
                {isOwnProfile ? (
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    Configurações
                  </Button>
                ) : (
                  <div className="flex gap-3">
                    <Button variant="outline">Seguir</Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Conversar
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-row w-full pl-5 mt-1 gap-3 text-primary text-sm ">
              <div
                className="flex flex-row items-center gap-1"
                onClick={handleFollowingOpen}
              >
                <span className="hover:cursor-pointer">0</span>
                <span className="hover:cursor-pointer">Seguindo</span>
              </div>

              <div
                className="flex flex-row items-center gap-1"
                onClick={handleFollowersOpen}
              >
                <span className="hover:cursor-pointer">0</span>
                <span className="hover:cursor-pointer">Seguidores</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isOwnProfile && (
        <EditProfile
          isOpen={isEditProfileOpen}
          onOpenChange={setIsEditProfileOpen}
        />
      )}
      <Followers isOpen={isFollowersOpen} onOpenChange={setIsFollowersOpen} />
      <Following isOpen={isFollowingOpen} onOpenChange={setIsFollowingOpen} />

      <div className="">
        <div className="h-35 relative">
          <img className="h-full w-full" src="/BannerLinkedin.png" alt="" />
          {isOwnProfile && (
            <ImageUp className="absolute right-4 text-white mb-20 top-27 hover:cursor-pointer" />
          )}
        </div>

        <div className="flex flex-col w-full">
          <div className="flex w-full">
            <div className="relative flex ml-[0.8em]">
              <Avatar
                className="w-27 h-27 rounded-full border-5 border-background mt-[-50px] bg-background"
                onClick={handleEditProfileOpen}
              >
                <AvatarImage
                  src={displayUser?.profileImg}
                  alt="Foto de perfil"
                  className="w-full h-full rounded-full object-cover hover:cursor-pointer"
                />
                <AvatarFallback className="w-full h-full flex items-center border-1 border-primary rounded-full justify-center text-primary text-5xl ">
                  {initials}
                </AvatarFallback>

                {isOwnProfile && (
                  <div className="absolute bottom-2 right-0 bg-background rounded-full p-1 border border-primary shadow-sm">
                    <Pencil className="h-4 w-4 text-primary cursor-pointer rotate-90" />
                  </div>
                )}
              </Avatar>
            </div>

            <div className="flex flex-col ml-[0.5em]">
              <p className="text-primary text-base">{displayUser?.username}</p>
              <p className="text-[#a1a1a1] text-xs">{displayUser?.name}</p>
            </div>

            <div className="ml-auto mr-4 mt-2 gap-3 flex">
              {isOwnProfile ? (
                <Button variant="outline" className="flex items-center gap-2">
                  Configurações
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button variant="outline">Seguir</Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Conversar
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-row w-full pl-5 mt-1 gap-3 text-primary text-sm ">
            <div
              className="flex flex-row items-center gap-1"
              onClick={handleFollowingOpen}
            >
              <span className="hover:cursor-pointer">0</span>
              <span className="hover:cursor-pointer">Seguindo</span>
            </div>

            <div
              className="flex flex-row items-center gap-1"
              onClick={handleFollowersOpen}
            >
              <span className="hover:cursor-pointer">0</span>
              <span className="hover:cursor-pointer">Seguidores</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}