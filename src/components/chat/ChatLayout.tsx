import { useState } from "react";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { ConversationList } from "@/components/chat/ConversationList";
import { useBreakpoints } from "@/hooks/useBreakpoints";

export const ChatLayout = () => {
  const [activeConversationId, setActiveConversationId] = useState(1);
  const [showConversations, setShowConversations] = useState(true);
  const { maxLeftSideBar } = useBreakpoints(); // Usar o mesmo breakpoint do projeto
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Atendimento",
      avatar: "AT",
      avatarColor:
        "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
      lastMessage:
        "O preço base é R$199, mas temos pacotes especiais para clientes existentes.",
      time: "09:35",
      unread: 0,
      online: true,
    },
    {
      id: 2,
      name: "Maria Silva",
      avatar: "MS",
      avatarColor:
        "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
      lastMessage: "Obrigada pela ajuda!",
      time: "Ontem",
      unread: 0,
      online: true,
    },
    {
      id: 3,
      name: "João Pereira",
      avatar: "JP",
      avatarColor:
        "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
      lastMessage: "Vamos agendar uma reunião para discutir os detalhes",
      time: "Seg",
      unread: 2,
      online: false,
    },
    {
      id: 4,
      name: "Ana Oliveira",
      avatar: "AO",
      avatarColor:
        "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300",
      lastMessage: "Você viu o novo relatório?",
      time: "23/05",
      unread: 0,
      online: true,
    },
    {
      id: 5,
      name: "Carlos Mendes",
      avatar: "CM",
      avatarColor:
        "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",
      lastMessage: "Precisamos revisar o orçamento",
      time: "20/05",
      unread: 5,
      online: false,
    },
  ]);

  const activeConversation = conversations.find(
    (conv) => conv.id === activeConversationId,
  );

  const handleSelectConversation = (id: number) => {
    setActiveConversationId(id);
    setConversations(
      conversations.map((conv) =>
        conv.id === id ? { ...conv, unread: 0 } : conv,
      ),
    );
    // Em mobile/tablet, esconde a lista de conversas quando seleciona uma conversa
    if (maxLeftSideBar) {
      setShowConversations(false);
    }
  };

  const handleBackToConversations = () => {
    setShowConversations(true);
  };

  return (
    <div className="flex w-full h-full bg-background overflow-hidden">
      {/* Mobile/Tablet: Mostra apenas uma tela por vez */}
      {maxLeftSideBar ? (
        <>
          {showConversations ? (
            <ConversationList
              conversations={conversations}
              activeConversationId={activeConversationId}
              onSelectConversation={handleSelectConversation}
              isMobile={true}
            />
          ) : (
            <ChatContainer
              activeConversation={activeConversation}
              onBack={handleBackToConversations}
              isMobile={true}
            />
          )}
        </>
      ) : (
        /* Desktop: Mostra ambas as telas lado a lado */
        <>
          <ConversationList
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={handleSelectConversation}
            isMobile={false}
          />
          <ChatContainer
            activeConversation={activeConversation}
            onBack={handleBackToConversations}
            isMobile={false}
          />
        </>
      )}
    </div>
  );
};
