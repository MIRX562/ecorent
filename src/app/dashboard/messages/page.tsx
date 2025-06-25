"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePixabayImage } from "@/hooks/use-pixabay-image";
import Image from "next/image";

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
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

// Sample data
const conversations: Conversation[] = [
  {
    id: "1",
    participant: {
      id: "user1",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
    },
    item: {
      id: "item1",
      name: "Canon EOS R5 Camera",
      image: "/placeholder.svg?height=60&width=60",
      price: 45,
      period: "3 days",
      status: "borrowed",
    },
    lastMessage: "This Friday to Sunday would be perfect. Is pickup available?",
    lastMessageTime: new Date(2024, 0, 15, 11, 15),
    unreadCount: 2,
  },
  {
    id: "2",
    participant: {
      id: "user2",
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: false,
    },
    item: {
      id: "item2",
      name: "MacBook Pro 16-inch",
      image: "/placeholder.svg?height=60&width=60",
      price: 35,
      period: "1 week",
      status: "listed",
    },
    lastMessage:
      "I need it for a video editing project. How's the battery life?",
    lastMessageTime: new Date(2024, 0, 14, 15, 10),
    unreadCount: 0,
  },
  {
    id: "3",
    participant: {
      id: "user3",
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
    },
    item: {
      id: "item3",
      name: "DJI Mavic Air 2 Drone",
      image: "/placeholder.svg?height=60&width=60",
      price: 25,
      period: "2 days",
      status: "borrowed",
    },
    lastMessage: "So glad to hear that! Feel free to rent again anytime.",
    lastMessageTime: new Date(2024, 0, 13, 17, 20),
    unreadCount: 0,
  },
  {
    id: "4",
    participant: {
      id: "user4",
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: false,
    },
    item: {
      id: "item4",
      name: "Nintendo Switch Console",
      image: "/placeholder.svg?height=60&width=60",
      price: 15,
      period: "5 days",
      status: "listed",
    },
    lastMessage: "Thanks for the quick response! When can I pick it up?",
    lastMessageTime: new Date(2024, 0, 12, 9, 30),
    unreadCount: 1,
  },
];

// Child component for rental item image with Pixabay hook
function ConversationItemImage({
  name,
  fallback,
  className,
}: {
  name: string;
  fallback: string;
  className?: string;
}) {
  const imageUrl = usePixabayImage(name, fallback);
  return (
    <Image
      src={imageUrl}
      alt={name}
      width={20}
      height={20}
      className={className}
    />
  );
}

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.participant.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      conversation.item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = conversations.reduce(
    (sum, conv) => sum + conv.unreadCount,
    0
  );

  return (
    <div className="mx-auto md:p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground">
            {totalUnread > 0
              ? `${totalUnread} unread messages`
              : "All caught up!"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-teal-500" />
          <span className="text-sm font-medium">
            {conversations.length} conversations
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Conversations List */}
      <div className="flex flex-col gap-2">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No conversations found</h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Start renting items to begin conversations"}
            </p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <Link
              key={conversation.id}
              href={`/dashboard/messages/${conversation.id}`}
            >
              <div
                className={cn(
                  "p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer",
                  conversation.unreadCount > 0 &&
                    "border-teal-200 bg-teal-50/50 dark:border-teal-800 dark:bg-teal-950/20"
                )}
              >
                <div className="flex items-start gap-4">
                  {/* User Avatar */}
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={
                          conversation.participant.avatar || "/placeholder.svg"
                        }
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
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </div>

                  {/* Conversation Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-sm">
                          {conversation.participant.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <ConversationItemImage
                            name={conversation.item.name}
                            fallback={
                              conversation.item.image || "/placeholder.svg"
                            }
                            className="w-5 h-5 rounded object-cover"
                          />
                          <span className="text-xs text-teal-600 dark:text-teal-400 font-medium truncate">
                            {conversation.item.name}
                          </span>
                          <Badge
                            variant={
                              conversation.item.status === "borrowed"
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {conversation.item.status === "borrowed"
                              ? "Borrowed"
                              : "Listed"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatTime(conversation.lastMessageTime)}
                        </span>
                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-teal-500 hover:bg-teal-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
