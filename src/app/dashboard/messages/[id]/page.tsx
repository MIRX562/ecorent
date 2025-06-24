"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, MoreVertical, Phone, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface RentalItem {
  id: string;
  name: string;
  image: string;
  price: number;
  period: string;
  status: "borrowed" | "listed";
}

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  item: RentalItem;
  messages: Message[];
}

// Sample conversation data (in real app, this would be fetched based on the ID)
const getConversation = (id: string): Conversation => ({
  id,
  participant: {
    id: "user1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
  },
  item: {
    id: "item1",
    name: "Canon EOS R5 Camera",
    image: "/placeholder.svg?height=80&width=80",
    price: 45,
    period: "3 days",
    status: "borrowed",
  },
  messages: [
    {
      id: "msg1",
      senderId: "user1",
      content: "Hi! I'm interested in renting your camera for the weekend.",
      timestamp: new Date(2024, 0, 15, 10, 30),
      isRead: true,
    },
    {
      id: "msg2",
      senderId: "currentUser",
      content: "Great! It's available. When do you need it?",
      timestamp: new Date(2024, 0, 15, 10, 45),
      isRead: true,
    },
    {
      id: "msg3",
      senderId: "user1",
      content: "This Friday to Sunday would be perfect. Is pickup available?",
      timestamp: new Date(2024, 0, 15, 11, 15),
      isRead: false,
    },
    {
      id: "msg4",
      senderId: "currentUser",
      content:
        "Yes, pickup is available! I'm located in downtown. What time works best for you?",
      timestamp: new Date(2024, 0, 15, 11, 30),
      isRead: true,
    },
    {
      id: "msg5",
      senderId: "user1",
      content:
        "Perfect! How about Friday around 2 PM? I can be flexible with the time.",
      timestamp: new Date(2024, 0, 15, 11, 45),
      isRead: false,
    },
  ],
});

export default function ChatPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [newMessage, setNewMessage] = useState("");
  const conversation = getConversation(params.id);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Here you would typically send the message to your backend
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  const handleBack = () => {
    router.push("/dashboard/messages");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
      {/* Chat Header */}
      <div className="p-4 border-b bg-card">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="md:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={conversation.participant.avatar || "/placeholder.svg"}
                  alt={conversation.participant.name}
                />
                <AvatarFallback>
                  {conversation.participant.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {conversation.participant.isOnline && (
                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{conversation.participant.name}</h3>
              <p className="text-sm text-muted-foreground">
                {conversation.participant.isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Item Context */}
      <div className="p-4 bg-teal-50 dark:bg-teal-950/20 border-b">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <img
                src={conversation.item.image || "/placeholder.svg"}
                alt={conversation.item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium">{conversation.item.name}</h4>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-lg font-semibold text-teal-600">
                    ${conversation.item.price}/day
                  </span>
                  <Badge
                    variant={
                      conversation.item.status === "borrowed"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {conversation.item.status === "borrowed"
                      ? "You borrowed this"
                      : "Your listing"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Rental period: {conversation.item.period}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.senderId === "currentUser"
                ? "justify-end"
                : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] sm:max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                message.senderId === "currentUser"
                  ? "bg-teal-500 text-white"
                  : "bg-muted"
              )}
            >
              <p className="text-sm">{message.content}</p>
              <p
                className={cn(
                  "text-xs mt-1",
                  message.senderId === "currentUser"
                    ? "text-teal-100"
                    : "text-muted-foreground"
                )}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-card">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-teal-500 hover:bg-teal-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
