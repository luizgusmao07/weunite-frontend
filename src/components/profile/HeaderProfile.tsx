import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ImageUp, Pencil } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import EditProfile from "./EditProfile";
import EditBanner from "./EditBanner";
import { useState } from "react";
import Following from "./Following";
import Followers from "./Followers";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useFollowAction } from "@/hooks/useFollowAction";
import { getInitials } from "@/utils/getInitials";

interface HeaderProfileProps {
  profileUsername?: string;
}

export default function HeaderProfile({ profileUsername }: HeaderProfileProps) {
  const { user } = useAuthStore();
  const { data: profileUser } = useUserProfile(profileUsername);

  const isOwnProfile = !profileUsername || profileUsername === user?.username;
  const displayUser = isOwnProfile ? user : profileUser;

  const {
    isFollowing,
    handleFollow,
    isLoading: isFollowLoading,
  } = useFollowAction(profileUsername);

  const renderFollowButton = () => (
    <Button
      variant="outline"
      onClick={handleFollow}
      className="px-3 py-2 text-sm"
      disabled={isFollowLoading}
    >
      {isFollowing ? "Deixar de seguir" : "Seguir"}
    </Button>
  );

  const initials = getInitials(displayUser?.name);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);
  const [isEditBannerOpen, setIsEditBannerOpen] = useState(false);

  const handleEditProfileOpen = () => {
    setIsEditProfileOpen(true);
  };
  const handleFollowingOpen = () => {
    setIsFollowingOpen(true);
  };

  const handleFollowersOpen = () => {
    setIsFollowersOpen(true);
  };

  const handleBannerEdit = () => {
    setIsEditBannerOpen(true);
  };

  const { isDesktop } = useBreakpoints();

  const isTablet = useMediaQuery("(min-width: 891px) and (max-width: 1290px)");

  if (isDesktop) {
    return (
      <>
        {isOwnProfile && (
          <EditProfile
            isOpen={isEditProfileOpen}
            onOpenChange={setIsEditProfileOpen}
          />
        )}

        {isOwnProfile && (
          <EditBanner
            isOpen={isEditBannerOpen}
            onOpenChange={setIsEditBannerOpen}
          />
        )}

        <Followers isOpen={isFollowersOpen} onOpenChange={setIsFollowersOpen} />
        <Following isOpen={isFollowingOpen} onOpenChange={setIsFollowingOpen} />

        <div className="w-[48em] mx-auto px-4">
          <div className="h-40 relative group">
            <img
              className="w-full h-full object-cover"
              src={displayUser?.bannerImg || "/BannerLinkedin.png"}
            />
            {isOwnProfile && (
              <>
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-white">
                    <ImageUp className="h-6 w-6" />
                    <span className="text-lg font-medium">
                      Adicionar foto de capa
                    </span>
                  </div>
                </div>

                <ImageUp
                  className="absolute right-6 text-white top-28 hover:cursor-pointer hover:scale-110 transition-transform z-10"
                  onClick={handleBannerEdit}
                />

                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={handleBannerEdit}
                />
              </>
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
                  <Button variant="outline" className="flex items-center gap-2">
                    Configurações
                  </Button>
                ) : (
                  <div className="flex gap-3">
                    {renderFollowButton()}
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

  if (isTablet) {
    return (
      <>
        {isOwnProfile && (
          <EditProfile
            isOpen={isEditProfileOpen}
            onOpenChange={setIsEditProfileOpen}
          />
        )}

        {isOwnProfile && (
          <EditBanner
            isOpen={isEditBannerOpen}
            onOpenChange={setIsEditBannerOpen}
          />
        )}

        <Followers isOpen={isFollowersOpen} onOpenChange={setIsFollowersOpen} />
        <Following isOpen={isFollowingOpen} onOpenChange={setIsFollowingOpen} />

        <div className="max-w-2xl w-[48em] mx-auto px-4">
          <div className="h-36 relative group">
            <img
              className="object-cover rounded-b-sm w-full h-full"
              src={displayUser?.bannerImg || "/BannerLinkedin.png"}
            />
            {isOwnProfile && (
              <>
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-b-sm">
                  <div className="flex items-center gap-2 text-white">
                    <ImageUp className="h-5 w-5" />
                    <span className="text-base font-medium">
                      Adicionar foto de capa
                    </span>
                  </div>
                </div>

                <ImageUp
                  className="absolute right-6 text-white top-28 hover:cursor-pointer hover:scale-110 transition-transform z-10"
                  onClick={handleBannerEdit}
                />

                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={handleBannerEdit}
                />
              </>
            )}
          </div>

          <div className="flex flex-col w-full">
            <div className="flex w-full">
              <div className="relative flex ml-[0.8em]">
                <Avatar
                  className="w-24 h-24 rounded-full border-4 border-background mt-[-40px] bg-background"
                  onClick={handleEditProfileOpen}
                >
                  <AvatarImage
                    src={displayUser?.profileImg}
                    alt="Foto de perfil"
                    className="w-full h-full rounded-full object-cover hover:cursor-pointer"
                  />
                  <AvatarFallback className="w-full h-full flex items-center border-1 border-primary rounded-full justify-center text-primary text-3xl">
                    {initials}
                  </AvatarFallback>
                  {isOwnProfile && (
                    <div className="absolute bottom-1 right-0 bg-background rounded-full p-1 border border-primary shadow-sm">
                      <Pencil className="h-3 w-3 text-primary cursor-pointer rotate-90" />
                    </div>
                  )}
                </Avatar>
              </div>

              <div className="flex flex-col ml-[0.5em] justify-center">
                <p className="text-primary font-medium text-xl">
                  {displayUser?.username}
                </p>
                <p className="text-[#a1a1a1] text-sm">{displayUser?.name}</p>
              </div>

              <div className="ml-auto mr-4 mt-2 gap-2 flex">
                {isOwnProfile ? (
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 px-3 py-2 text-sm"
                  >
                    Configurações
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    {renderFollowButton()}
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 px-3 py-2 text-sm"
                    >
                      <Send className="h-4 w-4" />
                      Conversar
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-row w-full pl-5 mt-2 gap-4 text-primary text-sm">
              <div
                className="flex flex-row items-center gap-1"
                onClick={handleFollowingOpen}
              >
                <span className="hover:cursor-pointer font-medium">0</span>
                <span className="hover:cursor-pointer">Seguindo</span>
              </div>

              <div
                className="flex flex-row items-center gap-1"
                onClick={handleFollowersOpen}
              >
                <span className="hover:cursor-pointer font-medium">0</span>
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

      {isOwnProfile && (
        <EditBanner
          isOpen={isEditBannerOpen}
          onOpenChange={setIsEditBannerOpen}
        />
      )}

      <Followers isOpen={isFollowersOpen} onOpenChange={setIsFollowersOpen} />
      <Following isOpen={isFollowingOpen} onOpenChange={setIsFollowingOpen} />

      <div className="w-[98vw] md:max-w-[77vw] mx-auto">
        <div className="h-35 relative group">
          <img
            className="h-full w-full object-cover"
            src={displayUser?.bannerImg || "/BannerLinkedin.png"}
            alt="Banner do perfil"
          />
          {isOwnProfile && (
            <>
              {/* Overlay hover */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="flex items-center gap-2 text-white">
                  <ImageUp className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    Adicionar foto de capa
                  </span>
                </div>
              </div>

              <ImageUp
                className="absolute right-6 text-white top-28 hover:cursor-pointer hover:scale-110 transition-transform z-10"
                onClick={handleBannerEdit}
              />

              <div
                className="absolute inset-0 cursor-pointer"
                onClick={handleBannerEdit}
              />
            </>
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
                  {renderFollowButton()}
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
