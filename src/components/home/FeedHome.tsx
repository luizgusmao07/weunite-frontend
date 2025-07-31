import type { Post as PostType } from "@/@types/post.types";
import Post from "@/components/post/Post";
import { useGetPosts } from "@/state/usePosts";

export function FeedHome() {
  const { data } = useGetPosts();
  const posts = data?.data;

  if (!posts || posts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]r">
        <p className="text-muted-foreground">Nenhum post encontrado</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full">
      <div className="max-w-[700px] w-full flex flex-col items-center ">
        {posts.map((post: PostType,) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
