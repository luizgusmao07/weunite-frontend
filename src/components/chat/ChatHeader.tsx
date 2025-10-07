import { Phone, Video, Info, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  avatarColor: string;
  online: boolean;
}

interface ChatHeaderProps {
  conversation: Conversation | undefined;
  onBack?: () => void;
  isMobile?: boolean;
}

export const ChatHeader = ({
  conversation,
  onBack,
  isMobile = false,
}: ChatHeaderProps) => {
  if (!conversation) return null;

  return (
    <div className="h-16 border-b border-border px-4 md:px-6 flex items-center justify-between bg-card">
      <div className="flex items-center">
        {isMobile && onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
            <ArrowLeft size={20} />
          </Button>
        )}
        {conversation.avatar.startsWith("http") ? (
          <img
            src={conversation.avatar}
            alt={conversation.name}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
        ) : (
          <div
            className={`w-10 h-10 rounded-full ${conversation.avatarColor} flex items-center justify-center mr-3`}
          >
            <span className="font-medium">{conversation.avatar}</span>
          </div>
        )}
        <div>
          <h2 className="font-medium">{conversation.name}</h2>
          <p className="text-xs text-muted-foreground">
            {conversation.online ? "Online agora" : "Offline"}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Phone size={18} />
        </Button>
        <Button variant="ghost" size="icon">
          <Video size={18} />
        </Button>
        <Button variant="ghost" size="icon">
          <Info size={18} />
        </Button>
      </div>
    </div>
  );
};
