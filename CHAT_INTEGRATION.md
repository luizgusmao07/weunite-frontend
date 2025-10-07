# Chat - Integração Backend + Frontend

## ✅ Funcionalidades Implementadas

### 1. Sistema de Busca de Usuários

- Integrado com o hook `useSearchUsers` existente
- Debounce de 300ms para otimização
- Pesquisa em tempo real
- Exibe resultados com foto de perfil ou iniciais
- Permite criar nova conversa com qualquer usuário

### 2. Criação de Conversas

- Hook `useCreateConversation` com invalidação automática de cache
- Ao clicar em um usuário da busca, cria conversa automaticamente
- Redireciona para a conversa criada
- Atualiza lista de conversas em tempo real

### 3. Exibição de Informações de Usuários

- Carrega informações completas de cada participante
- Exibe nome correto do usuário
- Mostra foto de perfil ou iniciais
- Tratamento de erros robusto
- Fallback para casos onde o usuário não é encontrado

### 4. WebSocket em Tempo Real

- Conexão automática ao fazer login
- Inscrição em conversas ativas
- Recebimento de mensagens em tempo real
- Atualização automática de cache do React Query
- Reconexão automática em caso de falha

### 5. Otimizações

- Removidos console.logs desnecessários
- Validação de imagens (http/https/data URLs)
- Tratamento de casos onde usuário não tem foto
- Loading states apropriados
- Error handling em todas as operações

## 📁 Arquivos Modificados

### Novos Arquivos

- `src/@types/chat.types.ts` - Tipos TypeScript para chat
- `src/api/services/chatService.ts` - Serviço de API do chat
- `src/state/useChat.ts` - Hooks React Query para chat
- `src/hooks/useWebSocket.ts` - Hook de WebSocket

### Arquivos Atualizados

- `src/components/chat/ChatLayout.tsx` - Layout principal do chat
- `src/components/chat/ConversationList.tsx` - Lista de conversas com busca
- `src/components/chat/ChatContainer.tsx` - Container de mensagens
- `vite.config.ts` - Configuração para SockJS

## 🔧 Padrões Seguidos

### 1. Serviço (chatService.ts)

```typescript
export const getUserConversationsRequest = async (userId: number) => {
  try {
    const { data } = await api.get(`/chat/conversations/user/${userId}`);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Mensagem de erro" };
  }
};
```

### 2. Hook React Query (useChat.ts)

```typescript
export const useGetUserConversations = (userId: number) => {
  return useQuery({
    queryKey: chatKeys.conversationsByUser(userId),
    queryFn: () => getUserConversationsRequest(userId),
    staleTime: 5000,
    enabled: !!userId,
  });
};
```

### 3. Componente

```typescript
const { data, isLoading } = useGetUserConversations(userId);
```

## 🚀 Como Usar

### Iniciar Nova Conversa

1. Digite o nome de um usuário na barra de pesquisa
2. Clique no usuário desejado
3. Conversa é criada automaticamente
4. Interface abre a nova conversa

### Enviar Mensagem

1. Selecione uma conversa
2. Digite a mensagem
3. Pressione Enter ou clique no botão enviar
4. Mensagem aparece em tempo real para todos os participantes

### Buscar Conversas Existentes

- As conversas são carregadas automaticamente
- Ordenadas por última mensagem
- Contador de mensagens não lidas
- Atualização em tempo real via WebSocket

## 🔄 Fluxo de Dados

```
Usuário digita → useSearchUsers (debounce) → searchService API
                                            ↓
                            Resultados exibidos em ConversationList
                                            ↓
Clica no usuário → useCreateConversation → chatService.createConversation
                                            ↓
                        Conversa criada → Cache invalidado → Lista atualizada
                                            ↓
                            Conversa aberta automaticamente
```

## 🐛 Tratamento de Erros

1. **Usuário não encontrado**: Exibe iniciais e nome genérico
2. **Falha no WebSocket**: Reconexão automática a cada 5s
3. **Erro na API**: Toast de erro + fallback UI
4. **Sem imagem**: Exibe iniciais coloridas
5. **Sem conversas**: Mensagem amigável ao usuário

## 📊 Performance

- **Debounce de busca**: 300ms
- **Cache do React Query**: 5min para usuários, 5s para conversas
- **Refetch**: Apenas ao focar janela ou receber mensagem
- **WebSocket**: Heartbeat de 4s
- **Loading states**: Evita múltiplos carregamentos

## ✨ Próximos Passos

- [ ] Upload de imagens/arquivos nas mensagens
- [ ] Indicador de "digitando..."
- [ ] Status online/offline real
- [ ] Notificações push
- [ ] Marcação de mensagens como lidas ao visualizar
- [ ] Paginação de mensagens antigas
