import Post from "@/components/post/Post";

export function FeedHome() {
    
    const posts = Array.from({ length: 10 }, (_, i) => i);
    
    return (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 h-screen w-full flex justify-center overflow-y-auto  pb-4">
            <div className="max-w-[600px] w-full space-y-6">
                {posts.map((index) => (
                    <Post key={index} />
                ))}
            </div>
        </div>
    );
}