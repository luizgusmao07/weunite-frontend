import { useState } from "react";
import { Smile, Paperclip, Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="p-3 md:p-3 border-t border-border bg-card">
      <form
        onSubmit={handleSubmit}
        className="flex items-center max-w-3xl mx-auto"
      >
        <Button type="button" variant="ghost" size="icon">
          <Smile size={20} />
        </Button>
        <Button type="button" variant="ghost" size="icon">
          <Paperclip size={20} />
        </Button>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1"
          placeholder="Digite sua mensagem..."
        />
        {message.trim() ? (
          <Button type="submit" size="icon">
            <Send size={18} />
          </Button>
        ) : (
          <Button type="button" variant="ghost" size="icon">
            <Mic size={20} />
          </Button>
        )}
      </form>
    </div>
  );
};
