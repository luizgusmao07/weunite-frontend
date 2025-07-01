import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // ✅ Import correto - shadcn/ui
import {
  Heart,
  Repeat2,
  MessageCircle,
  Bookmark,
  EllipsisVertical,
  Trash2,
  Share,
  Edit,
  Flag,
} from "lucide-react";
import type { Post } from "@/@types/post.types";
import { getTimeAgo } from "@/hooks/useGetTimeAgo";
import { useToggleLike } from "@/state/useLikes";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";
import { EditPost } from "../shared/EditPost";


const actions = [{ icon: Heart }, { icon: MessageCircle }, { icon: Repeat2 }];

export default function Post({ post }: { post: Post }) {
  const { user } = useAuthStore();

  const toggleLike = useToggleLike();

  const isLiked = post.likes.some((like) => like.user.id === user?.id);

  const [isEditPostOpen, setIsEditPostOpen] = useState(false);

  const handleEditPostOpen = () => {
    setIsEditPostOpen(true);
  };

  const handleLikeClick = () => {
    if (!user?.id) return;

    toggleLike.mutate({ postId: post.id, userId: user.id });
  };

  // Verificar se o post é do usuário logado
  const isOwner = post.user.id === user?.id;


  const handleDelete = () => {
    console.log("Deletar post:", post.id);
    // Implementar lógica de exclusão
  };

  const handleReport = () => {
    console.log("Reportar post:", post.id);
    // Implementar lógica de denúncia
  };

  const handleShare = () => {
    console.log("Compartilhar post:", post.id);
    // Implementar lógica de compartilhamento
  };

  return (
    <>
      <EditPost 
        open={isEditPostOpen}
        onOpenChange={setIsEditPostOpen}
        post={post}
      />

      <Card className="w-full max-w-[700px] bg-red shadow-none border-0 border-b rounded-none border-foreground/50 ">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarImage src={user?.profileImg} alt="User" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-base font-medium">
              {post.user.username}
            </CardTitle>

            <CardDescription className="text-xs">
              Publicado há {getTimeAgo(post.createdAt)}
            </CardDescription>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisVertical className="ml-auto h-5 w-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {isOwner ? (
                // Opções para o dono do post
                <>
                  <DropdownMenuItem onClick={handleEditPostOpen}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleShare}>
                    <Share className="mr-2 h-4 w-4" />
                    Compartilhar
                  </DropdownMenuItem>
                </>
              ) : (
                // Opções para outros usuários
                <>
                  <DropdownMenuItem onClick={handleShare}>
                    <Share className="mr-2 h-4 w-4" />
                    Compartilhar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleReport} className="text-red-600">
                    <Flag className="mr-2 h-4 w-4" />
                    Denunciar
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>   

        </CardHeader>

        <CardContent className="mt-[-18px]">
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="Post media"
              className="w-full h-auto rounded-sm mb-2"
            />
          )}
          <p className="">{post.text}</p>
        </CardContent>

        <CardFooter className="flex flex-col mt-[-20px]  ">
          <div className="flex justify-between w-full mb-1">
            <span className="text-sm text-muted-foreground">
              {post.likes.length || 0} curtidas • {post.comments.length || 0}{" "}
              comentários
            </span>
          </div>

          <div className="flex w-full justify-between">
            <CardAction className="flex items-center gap-3">
              {actions.map((action, index) => (
                <div
                  key={index}
                  onClick={index === 0 ? handleLikeClick : undefined}
                >
                  <action.icon
                    className={`h-5 w-5 transition-colors  ${
                      index === 0 && isLiked
                        ? "text-red-500 fill-red-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
              ))}
            </CardAction>

            <CardAction className="flex items-right gap-2 ">
              <div>
                <Bookmark className="h-5 w-5 text-muted-foreground varient-ghost" />
              </div>
            </CardAction>
          </div>

        
        </CardFooter>
      </Card>
    </>
  );
}
