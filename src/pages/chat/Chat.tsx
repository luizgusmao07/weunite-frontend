import { useBreakpoints } from "@/hooks/useBreakpoints";
import { ChatLayout } from "@/components/chat/ChatLayout";

export function Chat() {
  const { maxLeftSideBar } = useBreakpoints();

  return (
    <div
      className={`${
        maxLeftSideBar
          ? "h-[calc(100vh-5rem)]" // Mobile: descontar bottom bar (80px)
          : "h-screen" // Desktop: altura total
      }`}
    >
      <ChatLayout />
    </div>
  );
}
