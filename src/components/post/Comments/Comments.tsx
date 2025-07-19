import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import type { Post as PostType } from "@/@types/post.types";
import { X as CloseIcon } from "lucide-react";
import Post from "../Post";
import Comment from "./Comment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/stores/useAuthStore";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface CommentsProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  post: PostType;
}

export default function Comments({
  isOpen,
  onOpenChange,
  post,
}: CommentsProps) {
  
  const { user } = useAuthStore();

  const { commentDesktop } = useBreakpoints();

    if (!commentDesktop) {
      return (
        <Drawer open={isOpen} onOpenChange={onOpenChange}>
          <DrawerContent className="h-[100vh] data-[vaul-drawer-direction=bottom]:max-h-[100vh] mt-0 flex flex-col">
            <DrawerHeader className="pt-4 px-6 flex-shrink-0">
              <DrawerClose className="absolute rounded-sm transition-opacity right-4">
                <CloseIcon className="h-5 w-5 hover:cursor-pointer" />
              </DrawerClose>
              <DrawerTitle>Comentários</DrawerTitle>
            </DrawerHeader>

            <div className="flex flex-col w-full items-center overflow-y-auto">
              <Post post={post} />

              <div className="w-full max-w-[45em] border-y border-foreground/30 px-4 py-3 flex gap-4">
                <Avatar>
                  <AvatarImage src={user?.profileImg} />
                  <AvatarFallback>
                    {user?.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="w-full min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">
                    Respondendo a{" "}
                    <span className="text-sky-500 hover:cursor-pointer">@{post.user.username}</span>
                  </p>
                  <Textarea
                    placeholder="Poste sua resposta"
                    className="bg-transparent border-none resize-none focus-visible:ring-2 p-2 text-base"
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      size="sm"
                      className="rounded-full px-5 hover:cursor-pointer"
                    >
                      Publicar
                    </Button>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-[45em] p-2">
                <Comment />
                <Comment />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        );
    }

    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl w-[90vw] h-[90vh] p-0 rounded-xl">
          <div className="flex w-full h-full">

            <div className="w-1/2 h-full flex items-center justify-center bg-black">
              <img src={post.imageUrl ?? undefined} alt="Post" className="object-cover w-full h-full" />
            </div>

            <div className="w-1/2 flex flex-col">

              <div className="p-4 border-b flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={post.user.profileImg} />
                  <AvatarFallback>
                    {post.user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold">{post.user.username}</span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                <div className="w-full h-4 p-4 flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={post.user.profileImg} />
                  <AvatarFallback>
                    {post.user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm">{post.user.username}</p>
                <p className="text-sm">{post.text}</p>
              </div>

                <div className="h-[15em] text-xs">
                  <Comment />
                  <Comment />
                </div>

              </div>

               <div className="w-full max-w-[45em] justify-center items-center border-y border-foreground/30 px-4 py-3 flex gap-4">               
                 <Textarea
                    placeholder="Poste sua resposta"
                    className="bg-transparent border-none resize-none focus-visible:ring-2 p-2 text-base"
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      size="sm"
                      className="rounded-full px-5 hover:cursor-pointer"
                    >
                      Publicar
                    </Button>
                  </div>

              </div>
            </div>

          </div>

        </DialogContent>
      </Dialog>
    );
}


