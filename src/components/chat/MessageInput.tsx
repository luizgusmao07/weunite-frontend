import { useState, useRef } from "react";
import { Smile, Paperclip, Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
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
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 min-h-[40px] max-h-[120px] resize-none border-0 bg-muted/50 focus-visible:ring-1 focus-visible:ring-ring"
          placeholder="Digite sua mensagem..."
          rows={1}
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
