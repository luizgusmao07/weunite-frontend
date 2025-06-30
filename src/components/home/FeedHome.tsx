import type { Post as PostType } from "@/@types/post.types";
import Post from "@/components/post/Post";
import { useGetPosts } from "@/state/usePosts";

export function FeedHome() {
  const { data } = useGetPosts();
  const posts = data?.data;

  if (!posts || posts.length === 0) {
    return (
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 h-screen w-full flex justify-center items-center">
        <p className="text-muted-foreground">Nenhum post encontrado</p>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 h-screen w-full flex justify-center overflow-y-auto pb-4">
      <div className="max-w-[600px] w-full space-y-6 pt-4">
        {posts.map((post: PostType) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
