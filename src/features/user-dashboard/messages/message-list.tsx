"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus } from "lucide-react";
import type { ChatData } from "../page";

interface MessagesListProps {
  onChatSelect: (chat: ChatData) => void;
}

export default function MessagesList({ onChatSelect }: MessagesListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const mockChats: ChatData[] = [
    {
      id: "1",
      toolName: "DEWALT 20V MAX Cordless Drill",
      toolImage: "/placeholder.svg?height=60&width=60",
      ownerName: "Mike Johnson",
      ownerAvatar: "/placeholder.svg?height=40&width=40",
      renterName: "You",
      renterAvatar: "/placeholder.svg?height=40&width=40",
      lastMessage:
        "Great! Do you need any deposit, or is payment on pickup fine?",
      lastMessageTime: new Date("2024-01-15T11:30:00"),
      unreadCount: 0,
      dailyRate: 15,
      status: "pending",
      userRole: "renter",
    },
    {
      id: "2",
      toolName: "Bosch Circular Saw",
      toolImage: "/placeholder.svg?height=60&width=60",
      ownerName: "Sarah Chen",
      ownerAvatar: "/placeholder.svg?height=40&width=40",
      renterName: "Alex Rivera",
      renterAvatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "The saw worked perfectly! Returning it tomorrow morning.",
      lastMessageTime: new Date("2024-01-15T09:15:00"),
      unreadCount: 2,
      dailyRate: 25,
      status: "rented",
      userRole: "owner",
    },
    {
      id: "3",
      toolName: "Pressure Washer - 3000 PSI",
      toolImage: "/placeholder.svg?height=60&width=60",
      ownerName: "David Kim",
      ownerAvatar: "/placeholder.svg?height=40&width=40",
      renterName: "You",
      renterAvatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Is it still available for this weekend?",
      lastMessageTime: new Date("2024-01-14T16:45:00"),
      unreadCount: 1,
      dailyRate: 35,
      status: "available",
      userRole: "renter",
    },
    {
      id: "4",
      toolName: "KitchenAid Stand Mixer",
      toolImage: "/placeholder.svg?height=60&width=60",
      ownerName: "You",
      ownerAvatar: "/placeholder.svg?height=40&width=40",
      renterName: "Emma Wilson",
      renterAvatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thank you! The mixer was perfect for my baking project.",
      lastMessageTime: new Date("2024-01-14T14:20:00"),
      unreadCount: 0,
      dailyRate: 12,
      status: "available",
      userRole: "owner",
    },
    {
      id: "5",
      toolName: "Ladder - 8ft Extension",
      toolImage: "/placeholder.svg?height=60&width=60",
      ownerName: "Tom Rodriguez",
      ownerAvatar: "/placeholder.svg?height=40&width=40",
      renterName: "You",
      renterAvatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Can I extend the rental for one more day?",
      lastMessageTime: new Date("2024-01-13T19:30:00"),
      unreadCount: 3,
      dailyRate: 8,
      status: "rented",
      userRole: "renter",
    },
  ];

  const filteredChats = mockChats.filter(
    (chat) =>
      chat.toolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (chat.userRole === "owner" ? chat.renterName : chat.ownerName)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-700";
      case "rented":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search messages or tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="border-gray-300 hover:bg-teal-50"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <Card
            key={chat.id}
            className="rounded-none border-x-0 border-t-0 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => onChatSelect(chat)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                {/* Tool Image */}
                <div className="relative">
                  <img
                    src={chat.toolImage || "/placeholder.svg"}
                    alt={chat.toolName}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                  />
                  <Badge
                    className={`absolute -top-1 -right-1 text-xs px-1.5 py-0.5 ${getStatusColor(
                      chat.status
                    )}`}
                  >
                    {chat.status}
                  </Badge>
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {chat.toolName}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {formatTime(chat.lastMessageTime)}
                      </span>
                      {chat.unreadCount > 0 && (
                        <Badge className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={
                          chat.userRole === "owner"
                            ? chat.renterAvatar
                            : chat.ownerAvatar
                        }
                      />
                      <AvatarFallback className="text-xs bg-teal-100 text-teal-700">
                        {chat.userRole === "owner"
                          ? chat.renterName[0]
                          : chat.ownerName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">
                      {chat.userRole === "owner"
                        ? chat.renterName
                        : chat.ownerName}
                    </span>
                    <span className="text-sm text-teal-600 font-medium">
                      ${chat.dailyRate}/day
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
