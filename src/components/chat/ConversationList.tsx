import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  avatarColor: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: number;
  onSelectConversation: (id: number) => void;
  isMobile?: boolean;
}

export const ConversationList = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  isMobile = false,
}: ConversationListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      setIsSearching(true);
      const mockResults = [
        {
          id: 100,
          name: "Paulo Santos",
          avatar: "PS",
          avatarColor:
            "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300",
          role: "Designer",
        },
        {
          id: 101,
          name: "Fernanda Lima",
          avatar: "FL",
          avatarColor:
            "bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300",
          role: "Desenvolvedor",
        },
        {
          id: 102,
          name: "Roberto Gomes",
          avatar: "RG",
          avatarColor:
            "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300",
          role: "Gerente",
        },
      ].filter((user) => user.name.toLowerCase().includes(query.toLowerCase()));
      setSearchResults(mockResults);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const startNewConversation = (user: any) => {
    console.log("Iniciar conversa com:", user);
    setSearchQuery("");
    setIsSearching(false);
  };

  return (
    <div
      className={`${isMobile ? "w-full h-full min-h-0" : "w-80 md:w-96 h-full"} ${!isMobile ? "border-r border-border" : ""} bg-card flex flex-col overflow-hidden`}
    >
      <div className="p-3 md:p-4 border-b border-border sticky top-0 z-10 bg-card shrink-0">
        <h1 className="text-lg md:text-xl font-semibold mb-3">Conversas</h1>
        <div className="relative">
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="pl-9"
            placeholder="Pesquisar usuários..."
          />
          <Search
            size={18}
            className="absolute left-3 top-2.5 text-muted-foreground"
          />
        </div>
      </div>

      {isSearching ? (
        <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
          <div className="p-3 bg-muted text-sm text-muted-foreground font-medium">
            Resultados da pesquisa
          </div>
          {searchResults.length > 0 ? (
            searchResults.map((user) => (
              <div
                key={user.id}
                className="flex items-center p-3 hover:bg-muted cursor-pointer border-b border-border"
                onClick={() => startNewConversation(user)}
              >
                <div
                  className={`w-10 h-10 rounded-full ${user.avatarColor} flex items-center justify-center mr-3`}
                >
                  <span className="font-medium">{user.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {user.role}
                  </div>
                </div>
                <button className="p-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20">
                  <Plus size={16} />
                </button>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              Nenhum usuário encontrado
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-center p-3 cursor-pointer border-b border-border ${
                activeConversationId === conversation.id
                  ? "bg-primary/10"
                  : "hover:bg-muted"
              }`}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="relative">
                <div
                  className={`w-10 h-10 rounded-full ${conversation.avatarColor} flex items-center justify-center mr-3`}
                >
                  <span className="font-medium">{conversation.avatar}</span>
                </div>
                {conversation.online && (
                  <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <span className="font-medium truncate">
                    {conversation.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {conversation.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate max-w-[80%]">
                    {conversation.lastMessage}
                  </p>
                  {conversation.unread > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
