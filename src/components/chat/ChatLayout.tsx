import { useState, useEffect, useMemo } from "react";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { ConversationList } from "@/components/chat/ConversationList";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { useGetUserConversations } from "@/state/useChat";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { getUserById } from "@/api/services/userService";
import type { User } from "@/@types/user.types";

interface ConversationWithUser {
  id: number;
  name: string;
  avatar: string;
  avatarColor: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  otherUserId: number;
}

export const ChatLayout = () => {
  const userId = useAuthStore((state) => state.user?.id);
  const [activeConversationId, setActiveConversationId] = useState<
    number | null
  >(null);
  const [showConversations, setShowConversations] = useState(true);
  const { maxLeftSideBar } = useBreakpoints();
  const [conversationsWithUsers, setConversationsWithUsers] = useState<
    ConversationWithUser[]
  >([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const setIsConversationOpen = useChatStore(
    (state) => state.setIsConversationOpen,
  );

  const { data: conversationsData, isLoading } = useGetUserConversations(
    Number(userId) || 0,
  );

  useEffect(() => {
    const loadUsersData = async () => {
      if (
        !conversationsData?.success ||
        !conversationsData.data ||
        conversationsData.data.length === 0
      ) {
        setConversationsWithUsers([]);
        setLoadingUsers(false);
        return;
      }

      setLoadingUsers(true);

      try {
        const conversationsWithUserData = await Promise.all(
          conversationsData.data.map(async (conv) => {
            const otherParticipantId = conv.participantIds.find(
              (id) => id !== Number(userId),
            );

            if (!otherParticipantId) {
              return {
                id: conv.id,
                name: "Usuário Desconhecido",
                avatar: "?",
                avatarColor:
                  "bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300",
                lastMessage: conv.lastMessage?.content || "Sem mensagens",
                time: conv.lastMessage
                  ? new Date(conv.lastMessage.createdAt).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )
                  : "",
                unread: conv.unreadCount,
                online: false,
                otherUserId: 0,
              };
            }

            try {
              const userResponse = await getUserById(otherParticipantId);

              if (userResponse.success && userResponse.data) {
                const user: User = userResponse.data;
                const initials =
                  user.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2) || "??";

                const hasValidImage =
                  user.profileImg &&
                  (user.profileImg.startsWith("http://") ||
                    user.profileImg.startsWith("https://") ||
                    user.profileImg.startsWith("data:"));

                return {
                  id: conv.id,
                  name: user.name || `User ${otherParticipantId}`,
                  avatar: hasValidImage ? user.profileImg! : initials,
                  avatarColor:
                    "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
                  lastMessage: conv.lastMessage?.content || "Sem mensagens",
                  time: conv.lastMessage
                    ? new Date(conv.lastMessage.createdAt).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )
                    : "",
                  unread: conv.unreadCount,
                  online: false,
                  otherUserId: otherParticipantId,
                };
              }
            } catch (error) {
              console.error(
                `Erro ao buscar usuário ${otherParticipantId}:`,
                error,
              );
            }

            return {
              id: conv.id,
              name: `User ${otherParticipantId}`,
              avatar: "U",
              avatarColor:
                "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
              lastMessage: conv.lastMessage?.content || "Sem mensagens",
              time: conv.lastMessage
                ? new Date(conv.lastMessage.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "",
              unread: conv.unreadCount,
              online: false,
              otherUserId: otherParticipantId,
            };
          }),
        );

        setConversationsWithUsers(conversationsWithUserData);
      } catch (error) {
        console.error("Erro ao carregar dados dos usuários:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    loadUsersData();
  }, [conversationsData, userId]);

  useEffect(() => {
    if (!activeConversationId && conversationsWithUsers.length > 0) {
      setActiveConversationId(conversationsWithUsers[0].id);
    }
  }, [activeConversationId, conversationsWithUsers]);

  // Limpa o estado quando não estiver mais no mobile ou ao desmontar o componente
  useEffect(() => {
    if (!maxLeftSideBar) {
      setIsConversationOpen(false);
    }

    return () => {
      setIsConversationOpen(false);
    };
  }, [maxLeftSideBar, setIsConversationOpen]);

  const activeConversation = useMemo(() => {
    return conversationsWithUsers.find(
      (conv) => conv.id === activeConversationId,
    );
  }, [conversationsWithUsers, activeConversationId]);

  const handleSelectConversation = (id: number) => {
    setActiveConversationId(id);
    if (maxLeftSideBar) {
      setShowConversations(false);
      setIsConversationOpen(true); // Marca que uma conversa está aberta no mobile
    }
  };

  const handleBack = () => {
    setShowConversations(true);
    setIsConversationOpen(false); // Marca que voltou para a lista de conversas
  };

  if (isLoading || loadingUsers) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  if (!conversationsWithUsers || conversationsWithUsers.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">
          Nenhuma conversa encontrada
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex w-full h-full bg-background ${!maxLeftSideBar ? "rounded-lg shadow-sm border border-border" : ""} ${maxLeftSideBar ? "min-h-0" : ""}`}
    >
      {/* Mobile/Tablet: Mostra apenas uma tela por vez */}
      {maxLeftSideBar ? (
        <>
          {showConversations ? (
            <ConversationList
              conversations={conversationsWithUsers}
              activeConversationId={activeConversation?.id || 0}
              onSelectConversation={handleSelectConversation}
              isMobile={true}
            />
          ) : (
            <ChatContainer
              activeConversation={activeConversation}
              onBack={handleBack}
              isMobile={true}
            />
          )}
        </>
      ) : (
        /* Desktop: Mostra ambas as telas lado a lado */
        <div className="flex w-full h-full gap-0">
          <ConversationList
            conversations={conversationsWithUsers}
            activeConversationId={activeConversation?.id || 0}
            onSelectConversation={handleSelectConversation}
            isMobile={false}
          />
          <ChatContainer
            activeConversation={activeConversation}
            onBack={handleBack}
            isMobile={false}
          />
        </div>
      )}
    </div>
  );
};
