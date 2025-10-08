import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import type { ReactNode } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { SendMessage } from "@/@types/chat.types";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { chatKeys } from "@/state/useChat";

interface WebSocketContextType {
  isConnected: boolean;
  subscribeToConversation: (
    conversationId: number,
    userId: number,
  ) => (() => void) | undefined;
  sendMessage: (message: SendMessage) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const clientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const jwt = useAuthStore((state) => state.jwt);
  const queryClient = useQueryClient();

  // ✅ Cria a conexão WebSocket UMA ÚNICA VEZ quando o app carrega
  useEffect(() => {
    if (!jwt) {
      console.log("⚠️ WebSocket: JWT não encontrado");
      return;
    }

    // ✅ Se já existe uma conexão ativa, não recria
    if (clientRef.current?.connected) {
      console.log("✅ WebSocket: Já conectado, reutilizando conexão");
      return;
    }

    console.log("🚀 WebSocket: Tentando conectar...");
    console.log("📝 Token (primeiros 50 chars):", jwt.substring(0, 50) + "...");

    const client = new Client({
      webSocketFactory: () => {
        console.log("🔌 Criando conexão SockJS...");
        const socket = new SockJS("http://localhost:8080/ws");

        socket.onopen = () => console.log("✅ SockJS: Conexão aberta");
        socket.onerror = (e) => console.error("❌ SockJS: Erro", e);
        socket.onclose = (e) => console.log("⚠️ SockJS: Conexão fechada", e);

        return socket;
      },
      connectHeaders: {
        Authorization: `Bearer ${jwt}`,
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: (frame) => {
        console.log("✅ WebSocket: STOMP conectado com sucesso!", frame);
        setIsConnected(true);
      },
      onDisconnect: () => {
        console.log("⚠️ WebSocket: STOMP desconectado");
        setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error("❌ WebSocket STOMP error:", {
          command: frame.command,
          headers: frame.headers,
          body: frame.body,
        });
      },
      onWebSocketError: (event) => {
        console.error("❌ WebSocket connection error:", event);
      },
      onWebSocketClose: (event) => {
        console.log("🔌 WebSocket fechado:", {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean,
        });
      },
    });

    console.log("🔄 Ativando cliente WebSocket...");
    client.activate();
    clientRef.current = client;

    // ✅ Cleanup apenas quando o app desmonta (praticamente nunca)
    return () => {
      console.log("🔌 WebSocket: Desativando conexão (app desmontado)");
      client.deactivate();
    };
  }, [jwt]);

  const subscribeToConversation = useCallback(
    (conversationId: number, userId: number) => {
      if (!clientRef.current?.connected) {
        console.warn("⚠️ WebSocket não conectado, aguardando...");
        return;
      }

      console.log(`📡 Inscrevendo em /topic/conversation/${conversationId}`);

      const subscription = clientRef.current.subscribe(
        `/topic/conversation/${conversationId}`,
        (messageFrame) => {
          try {
            // Parseia a mensagem recebida
            const newMessage = JSON.parse(messageFrame.body);
            console.log("📩 Nova mensagem recebida via WebSocket:", newMessage);

            // Atualiza o cache DIRETAMENTE sem refetch
            queryClient.setQueryData(
              chatKeys.messagesByConversation(conversationId, userId),
              (oldData: any) => {
                if (!oldData?.success) return oldData;

                // Verifica se a mensagem já existe (evita duplicatas)
                const messageExists = oldData.data?.some(
                  (msg: any) => msg.id === newMessage.id,
                );

                if (messageExists) {
                  console.log("⚠️ Mensagem duplicada ignorada:", newMessage.id);
                  return oldData;
                }

                console.log("✅ Adicionando mensagem ao cache");
                // Adiciona nova mensagem ao final
                return {
                  ...oldData,
                  data: [...(oldData.data || []), newMessage],
                };
              },
            );

            // Atualiza lista de conversas (última mensagem)
            queryClient.invalidateQueries({
              queryKey: chatKeys.conversationsByUser(userId),
            });
          } catch (error) {
            console.error("❌ Erro ao processar mensagem WebSocket:", error);
          }
        },
      );

      return () => {
        console.log(
          `📴 Desinscrevendo de /topic/conversation/${conversationId}`,
        );
        subscription.unsubscribe();
      };
    },
    [queryClient],
  );

  const sendMessage = useCallback((message: SendMessage) => {
    if (!clientRef.current?.connected) {
      console.error("❌ WebSocket não está conectado");
      throw new Error("WebSocket não está conectado");
    }

    console.log("📤 Enviando mensagem via WebSocket:", message);

    // ✅ Envia via WebSocket - backend salva e notifica todos
    // A mensagem vai chegar via subscribeToConversation para TODOS os usuários (incluindo o remetente)
    clientRef.current.publish({
      destination: "/app/chat.sendMessage",
      body: JSON.stringify(message),
    });

    console.log("✅ Mensagem enviada, aguardando confirmação do servidor");
  }, []);

  return (
    <WebSocketContext.Provider
      value={{ isConnected, subscribeToConversation, sendMessage }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket deve ser usado dentro de WebSocketProvider");
  }
  return context;
};
