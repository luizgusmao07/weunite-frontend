import { useState, useEffect, useRef } from "react";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageList } from "@/components/chat/MessageList";
import { MessageInput } from "@/components/chat/MessageInput";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { triggerHapticFeedback } from "@/utils/hapticFeedback";

interface Message {
  id: number;
  text: string;
  sender: "me" | "other";
  time: string;
  read: boolean;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  avatarColor: string;
  online: boolean;
}

interface ChatContainerProps {
  activeConversation: Conversation | undefined;
  onBack?: () => void;
  isMobile?: boolean;
}

export const ChatContainer = ({
  activeConversation,
  onBack,
  isMobile = false,
}: ChatContainerProps) => {
  const conversationMessages: Record<number, Message[]> = {
    1: [
      {
        id: 1,
        text: "Vai pra peneira hoje?",
        sender: "other",
        time: "09:30",
        read: true,
      },
      {
        id: 2,
        text: "Vou sim mano, e você?",
        sender: "me",
        time: "09:31",
        read: true,
      },
      {
        id: 3,
        text: "Tambem vou, passa aqui em casa para gente ir junto",
        sender: "other",
        time: "09:32",
        read: true,
      },
      {
        id: 4,
        text: "Blz, até mais tarde",
        sender: "me",
        time: "09:33",
        read: true,
      },
      {
        id: 5,
        text: "Flw mano",
        sender: "other",
        time: "09:35",
        read: true,
      },
      {
        id: 6,
        text: "Ta vindo?",
        sender: "other",
        time: "12:30",
        read: true,
      },
    ],
    2: [
      {
        id: 1,
        text: "Viu o roubo do jogo ontem?",
        sender: "other",
        time: "14:22",
        read: true,
      },
      {
        id: 2,
        text: "KKKKKKKKKKKKKKKKK, to nem ai meu corinthias ganhou",
        sender: "me",
        time: "14:25",
        read: true,
      },
      {
        id: 3,
        text: "PO, AQUILO NAO SER FALTA MANO, NA FRENTE DO JUIZ",
        sender: "other",
        time: "14:26",
        read: true,
      },
      {
        id: 4,
        text: "KKKKKKKKKKKKKKKKKKKKKKKKKKKKK",
        sender: "me",
        time: "14:30",
        read: true,
      },
    ],
    3: [
      {
        id: 1,
        text: "Viu as luta do UFC?",
        sender: "me",
        time: "09:15",
        read: true,
      },
      {
        id: 2,
        text: "Vi nada mano, tava morto aqui em casa",
        sender: "other",
        time: "10:42",
        read: true,
      },
      {
        id: 3,
        text: "Slk, perdeu luizao, luta do poatan foi muito boa",
        sender: "me",
        time: "11:30",
        read: true,
      },
      {
        id: 4,
        text: "Vou ver depois mano",
        sender: "other",
        time: "11:45",
        read: false,
      },
    ],
    4: [
      {
        id: 1,
        text: "Vai pra academia hoje?",
        sender: "me",
        time: "09:15",
        read: true,
      },
      {
        id: 2,
        text: "Vo nada, trabalhar ne",
        sender: "other",
        time: "10:42",
        read: true,
      },
      {
        id: 3,
        text: "Presencial hoje",
        sender: "me",
        time: "11:30",
        read: true,
      },
      {
        id: 4,
        text: "Sim to aqui ja",
        sender: "other",
        time: "11:45",
        read: false,
      },
    ],
    5: [
      {
        id: 1,
        text: "Manoel",
        sender: "other",
        time: "11:30",
        read: true,
      },
      {
        id: 2,
        text: "Manoel",
        sender: "other",
        time: "11:30",
        read: true,
      },
      {
        id: 3,
        text: "Manoel",
        sender: "other",
        time: "11:31",
        read: true,
      },
      {
        id: 4,
        text: "Oi, tava trabalhando",
        sender: "me",
        time: "14:00",
        read: false,
      },
      {
        id: 5,
        text: "Esqueci oque ia falar rs",
        sender: "other",
        time: "14:02",
        read: false,
      },
    ],
  };

  const [messages, setMessages] = useState<Message[]>(
    conversationMessages[activeConversation?.id || 1] || [],
  );

  // Typing indicator state
  const [isOtherTyping, setIsOtherTyping] = useState(false);

  // Pull-to-refresh state
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const messageAreaRef = useRef<HTMLDivElement>(null);

  // Swipe gesture state
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  useEffect(() => {
    if (activeConversation) {
      setMessages(conversationMessages[activeConversation.id] || []);
    }
  }, [activeConversation?.id]);

  // Handle touch events for swipe and pull-to-refresh
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);

    // Handle pull-to-refresh only if we're at the top of messages
    if (messageAreaRef.current && touchStartY !== null) {
      const scrollTop = messageAreaRef.current.scrollTop;
      const currentY = e.targetTouches[0].clientY;
      const deltaY = currentY - touchStartY;

      if (scrollTop === 0 && deltaY > 0 && deltaY < 100) {
        setPullDistance(deltaY);
        e.preventDefault(); // Prevent default scroll behavior
      }
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isRightSwipe = distance < -50;

    // Swipe right to go back on mobile
    if (isRightSwipe && isMobile && onBack) {
      triggerHapticFeedback("light");
      onBack();
    }

    // Handle pull-to-refresh
    if (pullDistance > 60) {
      handleRefresh();
    }
    setPullDistance(0);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    triggerHapticFeedback("medium");

    // Simulate loading new messages
    setTimeout(() => {
      setIsRefreshing(false);
      // Could add new messages here in a real app
    }, 1500);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Trigger haptic feedback on message send
    triggerHapticFeedback("light");

    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: false,
    };

    setMessages([...messages, newMessage]);

    // Simulate other person typing
    setTimeout(() => {
      setIsOtherTyping(true);
    }, 500);

    setTimeout(() => {
      setIsOtherTyping(false);
      // Trigger haptic feedback on message received
      triggerHapticFeedback("medium");

      const responseMessage: Message = {
        id: messages.length + 2,
        text: "Obrigado pela mensagem! Alguma outra dúvida?",
        sender: "other",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        read: false,
      };
      setMessages((prev) => [...prev, responseMessage]);
    }, 2000);
  };

  return (
    <div
      ref={containerRef}
      className={`${isMobile ? "w-full h-full" : "flex-1 h-full"} relative ${!isMobile ? "rounded-r-lg bg-background" : ""}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header fixo no topo */}
      <div
        className={`absolute top-0 left-0 right-0 z-10 ${!isMobile ? "rounded-tr-lg" : ""}`}
      >
        <ChatHeader
          conversation={activeConversation}
          onBack={onBack}
          isMobile={isMobile}
        />
      </div>

      {/* Área de mensagens com scroll */}
      <div
        ref={messageAreaRef}
        className={`absolute top-16 left-0 right-0 overflow-y-auto bg-background custom-scrollbar ${isMobile ? "bottom-20" : "bottom-[80px]"}`}
        style={{
          transform:
            pullDistance > 0
              ? `translateY(${Math.min(pullDistance * 0.5, 30)}px)`
              : "none",
        }}
      >
        {/* Pull-to-refresh indicator */}
        {(pullDistance > 0 || isRefreshing) && (
          <div className="flex justify-center items-center py-4">
            <div
              className={`transition-all duration-200 ${isRefreshing ? "animate-spin" : ""}`}
            >
              {isRefreshing ? (
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <div
                  className={`text-sm text-muted-foreground transition-opacity duration-200 ${pullDistance > 60 ? "opacity-100" : "opacity-50"}`}
                >
                  {pullDistance > 60
                    ? "↓ Solte para atualizar"
                    : "↓ Puxe para atualizar"}
                </div>
              )}
            </div>
          </div>
        )}
        <MessageList messages={messages} />
        <TypingIndicator
          isTyping={isOtherTyping}
          userName={activeConversation?.name}
        />
      </div>

      {/* Input fixo na parte inferior */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-10 ${!isMobile ? "rounded-br-lg" : ""}`}
      >
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};
