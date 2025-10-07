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
      name: "Leonardo",
      avatar: "LD",
      avatarColor:
        "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
      lastMessage: "Ta vindo?",
      time: "12:30",
      unread: 1,
      online: true,
    },
    {
      id: 2,
      name: "Marcus",
      avatar: "MS",
      avatarColor:
        "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
      lastMessage: "KKKKKKKKKKKKKKKKKKKKKKKKKKKKK",
      time: "Ontem",
      unread: 0,
      online: true,
    },
    {
      id: 3,
      name: "Luiz",
      avatar: "LZ",
      avatarColor:
        "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
      lastMessage: "Vou ver depois mano",
      time: "Ontem",
      unread: 0,
      online: false,
    },
    {
      id: 4,
      name: "Matheus Estevam",
      avatar: "ME",
      avatarColor:
        "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300",
      lastMessage: "Sim to aqui ja",
      time: "23/05",
      unread: 0,
      online: true,
    },
    {
      id: 5,
      name: "Caio Godas",
      avatar: "CG",
      avatarColor:
        "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",
      lastMessage: "Esqueci oque ia falar rs",
      time: "20/05",
      unread: 1,
      online: false,
    },
    {
      id: 6,
      name: "Beatriz Santos",
      avatar: "BS",
      avatarColor: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
      lastMessage: "Feliz aniversário!",
      time: "15/05",
      unread: 0,
      online: true,
    },
    {
      id: 7,
      name: "Rafael Costa",
      avatar: "RC",
      avatarColor:
        "bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300",
      lastMessage: "Podemos marcar para amanhã?",
      time: "10/05",
      unread: 0,
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

    if (maxLeftSideBar) {
      setShowConversations(false);
    }
  };

  const handleBackToConversations = () => {
    setShowConversations(true);
  };

  return (
    <div
      className={`flex w-full h-full bg-background ${!maxLeftSideBar ? "rounded-lg shadow-sm border border-border" : ""} ${maxLeftSideBar ? "min-h-0" : ""}`}
    >
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
        <div className="flex w-full h-full gap-0">
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
        </div>
      )}
    </div>
  );
};
