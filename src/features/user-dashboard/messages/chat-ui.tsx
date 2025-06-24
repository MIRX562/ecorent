"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  MapPin,
  Calendar,
  DollarSign,
  ArrowLeft,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "owner" | "renter";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

interface ChatUIProps {
  chat: ChatData;
  onBack: () => void;
}

export default function ChatUI({ chat, onBack }: ChatUIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! Is the power drill still available for tomorrow? I need it for a home project.",
      sender: "renter",
      timestamp: new Date("2024-01-15T10:30:00"),
      status: "read",
    },
    {
      id: "2",
      content:
        "Yes, it's available! How many days do you need it for? It comes with a full set of drill bits.",
      sender: "owner",
      timestamp: new Date("2024-01-15T10:45:00"),
      status: "read",
    },
    {
      id: "3",
      content:
        "Just for 2 days should be enough. What time can I pick it up tomorrow?",
      sender: "renter",
      timestamp: new Date("2024-01-15T11:00:00"),
      status: "read",
    },
    {
      id: "4",
      content:
        "Perfect! You can pick it up anytime after 9 AM. I'll include the charger and instruction manual.",
      sender: "owner",
      timestamp: new Date("2024-01-15T11:15:00"),
      status: "delivered",
    },
    {
      id: "5",
      content: "Great! Do you need any deposit, or is payment on pickup fine?",
      sender: "renter",
      timestamp: new Date("2024-01-15T11:30:00"),
      status: "sent",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: chat.userRole === "owner" ? "owner" : "renter",
        timestamp: new Date(),
        status: "sent",
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isCurrentUserMessage = (sender: "owner" | "renter") => {
    return sender === chat.userRole;
  };

  const getOtherUserName = () => {
    return chat.userRole === "owner" ? chat.renterName : chat.ownerName;
  };

  const getOtherUserAvatar = () => {
    return chat.userRole === "owner" ? chat.renterAvatar : chat.ownerAvatar;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <Card className="rounded-none border-b border-teal-100">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="text-teal-600 hover:bg-teal-50"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Avatar className="h-12 w-12">
                <AvatarImage src={getOtherUserAvatar() || "/placeholder.svg"} />
                <AvatarFallback className="bg-teal-100 text-teal-700">
                  {getOtherUserName()[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-gray-900">
                  {getOtherUserName()}
                </h2>
                <Badge
                  variant="secondary"
                  className="bg-teal-100 text-teal-700 hover:bg-teal-200"
                >
                  {chat.userRole === "owner" ? "Renter" : "Tool Owner"}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-teal-600 hover:bg-teal-50"
              >
                <Phone className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-teal-600 hover:bg-teal-50"
              >
                <Video className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:bg-gray-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tool Info */}
          <div className="mt-4 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-100">
            <div className="flex items-center space-x-4">
              <img
                src={chat.toolImage || "/placeholder.svg"}
                alt={chat.toolName}
                className="w-16 h-16 rounded-lg object-cover border border-teal-200"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-2">
                  {chat.toolName}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-teal-600" />
                    <span>Downtown Area - 0.5 miles away</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-teal-600" />
                    <span>${chat.dailyRate}/day</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-teal-600" />
                    <Badge
                      className={`text-xs ${
                        chat.status === "available"
                          ? "bg-green-100 text-green-700"
                          : chat.status === "rented"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {chat.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              isCurrentUserMessage(message.sender)
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                isCurrentUserMessage(message.sender)
                  ? "flex-row-reverse space-x-reverse"
                  : ""
              }`}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={
                    isCurrentUserMessage(message.sender)
                      ? chat.userRole === "owner"
                        ? chat.ownerAvatar
                        : chat.renterAvatar
                      : chat.userRole === "owner"
                      ? chat.renterAvatar
                      : chat.ownerAvatar
                  }
                />
                <AvatarFallback
                  className={`text-xs ${
                    isCurrentUserMessage(message.sender)
                      ? "bg-blue-100 text-blue-700"
                      : "bg-teal-100 text-teal-700"
                  }`}
                >
                  {isCurrentUserMessage(message.sender)
                    ? "YU"
                    : getOtherUserName()[0]}
                </AvatarFallback>
              </Avatar>
              <div
                className={`rounded-2xl px-4 py-2 ${
                  isCurrentUserMessage(message.sender)
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                    : "bg-white border border-gray-200 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <div
                  className={`flex items-center justify-between mt-1 text-xs ${
                    isCurrentUserMessage(message.sender)
                      ? "text-teal-100"
                      : "text-gray-500"
                  }`}
                >
                  <span>{formatTime(message.timestamp)}</span>
                  {isCurrentUserMessage(message.sender) && (
                    <span className="ml-2">
                      {message.status === "sent" && "✓"}
                      {message.status === "delivered" && "✓✓"}
                      {message.status === "read" && "✓✓"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex items-center space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask about pickup, usage, or availability..."
            className="flex-1 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Messages are encrypted and secure
        </p>
      </div>
    </div>
  );
}
