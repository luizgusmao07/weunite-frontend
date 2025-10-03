import { useState } from "react";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageList } from "@/components/chat/MessageList";
import { MessageInput } from "@/components/chat/MessageInput";

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
        text: "Olá! Como posso ajudar você hoje?",
        sender: "other",
        time: "09:30",
        read: true,
      },
      {
        id: 2,
        text: "Preciso de informações sobre o novo produto.",
        sender: "me",
        time: "09:31",
        read: true,
      },
      {
        id: 3,
        text: "Claro! O novo produto será lançado na próxima semana. Ele terá recursos avançados e um design moderno.",
        sender: "other",
        time: "09:32",
        read: true,
      },
      {
        id: 4,
        text: "Excelente! Quais são os preços?",
        sender: "me",
        time: "09:33",
        read: true,
      },
      {
        id: 5,
        text: "O preço base é R$199, mas temos pacotes especiais para clientes existentes.",
        sender: "other",
        time: "09:35",
        read: true,
      },
    ],
    2: [
      {
        id: 1,
        text: "Olá Maria, como está o projeto?",
        sender: "me",
        time: "14:22",
        read: true,
      },
      {
        id: 2,
        text: "Está indo bem! Estamos quase finalizando a primeira etapa.",
        sender: "other",
        time: "14:25",
        read: true,
      },
      {
        id: 3,
        text: "Precisa de algum suporte adicional?",
        sender: "me",
        time: "14:26",
        read: true,
      },
      {
        id: 4,
        text: "Não, está tudo sob controle. Obrigada pela ajuda!",
        sender: "other",
        time: "14:30",
        read: true,
      },
    ],
    3: [
      {
        id: 1,
        text: "João, você revisou o documento que enviei?",
        sender: "me",
        time: "09:15",
        read: true,
      },
      {
        id: 2,
        text: "Sim, fiz algumas anotações. Podemos discutir?",
        sender: "other",
        time: "10:42",
        read: true,
      },
      {
        id: 3,
        text: "Claro! Quando você tem disponibilidade?",
        sender: "me",
        time: "11:30",
        read: true,
      },
      {
        id: 4,
        text: "Vamos agendar uma reunião para discutir os detalhes",
        sender: "other",
        time: "11:45",
        read: false,
      },
    ],
  };

  const [messages, setMessages] = useState<Message[]>(
    conversationMessages[activeConversation?.id || 1] || [],
  );

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

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

    setTimeout(() => {
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
    }, 1000);
  };

  return (
    <div className={`${isMobile ? "w-full" : "flex-1"} relative h-full`}>
      {/* Header fixo no topo */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <ChatHeader
          conversation={activeConversation}
          onBack={onBack}
          isMobile={isMobile}
        />
      </div>

      {/* Área de mensagens com scroll */}
      <div className="absolute top-16 bottom-[72px] md:bottom-[80px] left-0 right-0 overflow-y-auto bg-background">
        <MessageList messages={messages} />
      </div>

      {/* Input fixo na parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};
