# 🏗️ Arquitetura do Chat - WebSocket Real-Time

## ✅ Arquitetura Correta (Baseada no Backend)

### Backend Analysis

O backend usa **APENAS WebSocket** para mensagens:

```java
@MessageMapping("/chat.sendMessage")
public void sendMessage(@Payload @Valid SendMessageRequestDTO request) {
    MessageDTO messageDTO = messageService.sendMessage(request);

    messagingTemplate.convertAndSend(
        "/topic/conversation/" + request.conversationId(),
        messageDTO
    );
}
```

**NÃO existe endpoint HTTP** `/api/messages/send`!

## 🎯 Fluxo Correto

### 1. Enviar Mensagem

```typescript
// ChatContainer.tsx
const handleSendMessage = (text: string) => {
  sendMessage({
    conversationId: activeConversation.id,
    senderId: Number(userId),
    content: text,
    type: "TEXT",
  });
};

// useWebSocket.ts
const sendMessage = (message) => {
  client.publish({
    destination: "/app/chat.sendMessage", // ✅ WebSocket
    body: JSON.stringify(message),
  });
};
```

**Fluxo:**

1. Usuário A envia via WebSocket
2. Backend recebe e salva no banco
3. Backend envia para `/topic/conversation/{id}`
4. **TODOS** os usuários inscritos recebem (incluindo A)
5. Frontend invalida cache
6. React Query faz refetch
7. Mensagem aparece para todos

### 2. Receber Mensagem

```typescript
const subscribeToConversation = (conversationId, userId) => {
  client.subscribe(`/topic/conversation/${conversationId}`, () => {
    // Invalida cache
    queryClient.invalidateQueries({
      queryKey: chatKeys.messagesByConversation(conversationId, userId),
    });
  });
};
```

## ⚙️ Configuração React Query

```typescript
export const useGetConversationMessages = (conversationId, userId) => {
  return useQuery({
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false, // Não refetch ao focar
    refetchOnMount: false, // Não refetch ao montar
    refetchOnReconnect: true, // Apenas ao reconectar
  });
};
```

**Por quê?**

- ✅ Confia no WebSocket para atualizações
- ✅ Não faz refetch desnecessário
- ✅ Cache válido por 5 minutos
- ✅ Apenas invalida quando WebSocket notificar

## � Ciclo Completo

```
Usuário A envia "Olá"
    ↓
WebSocket: /app/chat.sendMessage
    ↓
Backend: salva no banco + envia para /topic
    ↓
WebSocket notifica TODOS (incluindo A)
    ↓
Frontend: invalidateQueries
    ↓
React Query: refetch
    ↓
TODOS veem a mensagem
```

## ❌ O que NÃO fazer

1. ❌ Tentar usar HTTP POST (não existe no backend)
2. ❌ Optimistic updates (WebSocket já é rápido)
3. ❌ setTimeout para "dar tempo"
4. ❌ refetchOnMount/refetchOnWindowFocus
5. ❌ staleTime muito baixo

## ✅ O que fazer

1. ✅ Usar APENAS WebSocket
2. ✅ Confiar na invalidação do WebSocket
3. ✅ staleTime de 5 minutos
4. ✅ Desativar refetch automático
5. ✅ Deixar o backend gerenciar tudo

## 🎯 Resultado

- ✅ Mensagens aparecem em tempo real
- ✅ Sem requisições HTTP desnecessárias
- ✅ Sem atualizações automáticas indesejadas
- ✅ Código limpo e simples
- ✅ Segue exatamente o que o backend espera

**Conclusão:** Simples, direto e sem gambiarras! 🚀
