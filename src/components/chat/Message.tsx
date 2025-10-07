import { Check } from "lucide-react";

interface MessageType {
  id: number;
  text: string;
  sender: "me" | "other";
  time: string;
  read: boolean;
}

interface MessageProps {
  message: MessageType;
}

export const Message = ({ message }: MessageProps) => {
  const isSender = message.sender === "me";

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] md:max-w-[80%] ${isSender ? "order-1" : "order-2"}`}
      >
        <div
          className={`p-2 md:p-3 rounded-lg ${
            isSender
              ? "bg-primary text-primary-foreground rounded-br-none"
              : "bg-card text-card-foreground rounded-bl-none border border-border"
          }`}
        >
          <p className="text-sm">{message.text}</p>
        </div>
        <div
          className={`flex items-center mt-1 text-xs text-muted-foreground ${
            isSender ? "justify-end" : "justify-start"
          }`}
        >
          <span>{message.time}</span>
          {isSender && (
            <span className="ml-1 flex items-center">
              <Check size={12} className={message.read ? "text-primary" : ""} />
              <Check
                size={12}
                className={`-ml-1 ${message.read ? "text-primary" : ""}`}
              />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
