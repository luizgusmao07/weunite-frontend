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
  Heart,
  Repeat2,
  MessageCircle,
  Bookmark,
  EllipsisVertical,
} from "lucide-react";
import type { Post } from "@/@types/post.types";
import { getTimeAgo } from "@/hooks/useGetTimeAgo";
import { useToggleLike } from "@/hooks/useLikes";
import { useAuthStore } from "@/stores/useAuthStore";

const actions = [{ icon: Heart }, { icon: MessageCircle }, { icon: Repeat2 }];

export default function Post({ post }: { post: Post }) {
    
  const { user } = useAuthStore();

  const toggleLike = useToggleLike();

  const isLiked = post.likes.some((like) => like.user.id === user?.id);

  const handleLikeClick = () => {
    if (!user?.id) return;

    toggleLike.mutate({ postId: post.id, userId: user.id });
  };

  return (
    <Card className="w-full max-w-[600px] bg-transparent border-0 shadow-none ">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
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
        <EllipsisVertical className="ml-auto h-5 w-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
      </CardHeader>
      <CardContent className="mt-[-15px]">
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt="Post media"
            className="w-full h-auto rounded-sm "
          />
        )}
        <p>{post.text}</p>
      </CardContent>
      <CardFooter className="flex flex-col mt-[-20px]">
        <div className="flex justify-between w-full mb-1">
          <span className="text-sm text-muted-foreground">
            {post.likes.length || 0} curtidas • {post.comments.length || 0}{" "}
            comentários
          </span>
        </div>
        <div className="flex w-full justify-between">
          <CardAction className="flex items-center gap-2">
            {actions.map((action, index) => (
              <div
                key={index}
                className={`flex items-center gap-1 cursor-pointer hover:bg-muted p-1 rounded-md transition-colors ${
                  index === 3 ? "ml-auto" : ""
                }`}
                onClick={index === 0 ? handleLikeClick : undefined}
              >
                <action.icon
                  className={`h-5 w-5 transition-colors ${
                    index === 0 && isLiked
                      ? "text-red-500 fill-red-500"
                      : "text-muted-foreground"
                  }`}
                />
              </div>
            ))}
          </CardAction>

          <CardAction className="flex items-right gap-2">
            <div>
              <Bookmark className="h-5 w-5 text-muted-foreground varient-ghost" />
            </div>
          </CardAction>
        </div>
        <div className="w-[100%] mx-auto border-b-1 mt-4 border-foreground/50"></div>
      </CardFooter>
    </Card>
  );
}
