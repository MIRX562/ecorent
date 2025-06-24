"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, MoreVertical, Phone, Video, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  isRead: boolean
}

interface RentalItem {
  id: string
  name: string
  image: string
  price: number
  period: string
  status: "borrowed" | "listed"
}

interface Conversation {
  id: string
  participant: {
    id: string
    name: string
    avatar: string
  }
  item: RentalItem
  messages: Message[]
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
}

// Sample data
const conversations: Conversation[] = [
  {
    id: "1",
    participant: {
      id: "user1",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
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
    ],
    lastMessage: "This Friday to Sunday would be perfect. Is pickup available?",
    lastMessageTime: new Date(2024, 0, 15, 11, 15),
    unreadCount: 1,
  },
  {
    id: "2",
    participant: {
      id: "user2",
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    item: {
      id: "item2",
      name: "MacBook Pro 16-inch",
      image: "/placeholder.svg?height=80&width=80",
      price: 35,
      period: "1 week",
      status: "listed",
    },
    messages: [
      {
        id: "msg4",
        senderId: "currentUser",
        content: "Hi! Is your MacBook still available for rent?",
        timestamp: new Date(2024, 0, 14, 14, 20),
        isRead: true,
      },
      {
        id: "msg5",
        senderId: "user2",
        content: "Yes, it's available! What do you need it for?",
        timestamp: new Date(2024, 0, 14, 14, 35),
        isRead: true,
      },
      {
        id: "msg6",
        senderId: "currentUser",
        content: "I need it for a video editing project. How's the battery life?",
        timestamp: new Date(2024, 0, 14, 15, 10),
        isRead: true,
      },
    ],
    lastMessage: "I need it for a video editing project. How's the battery life?",
    lastMessageTime: new Date(2024, 0, 14, 15, 10),
    unreadCount: 0,
  },
  {
    id: "3",
    participant: {
      id: "user3",
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    item: {
      id: "item3",
      name: "DJI Mavic Air 2 Drone",
      image: "/placeholder.svg?height=80&width=80",
      price: 25,
      period: "2 days",
      status: "borrowed",
    },
    messages: [
      {
        id: "msg7",
        senderId: "user3",
        content: "Thank you for the drone rental! The footage came out amazing.",
        timestamp: new Date(2024, 0, 13, 16, 45),
        isRead: true,
      },
      {
        id: "msg8",
        senderId: "currentUser",
        content: "So glad to hear that! Feel free to rent again anytime.",
        timestamp: new Date(2024, 0, 13, 17, 20),
        isRead: true,
      },
    ],
    lastMessage: "So glad to hear that! Feel free to rent again anytime.",
    lastMessageTime: new Date(2024, 0, 13, 17, 20),
    unreadCount: 0,
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0])
  const [newMessage, setNewMessage] = useState("")

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (days === 1) {
      return "Yesterday"
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: "short" })
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // Here you would typically send the message to your backend
    console.log("Sending message:", newMessage)
    setNewMessage("")
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-background">
      {/* Conversations List */}
      <div className="w-80 border-r bg-card">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Messages</h2>
        </div>
        <div className="overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors",
                selectedConversation.id === conversation.id &&
                  "bg-teal-50 dark:bg-teal-950/20 border-r-2 border-r-teal-500",
              )}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="flex items-start gap-3">
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
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{conversation.participant.name}</p>
                    <span className="text-xs text-muted-foreground">{formatTime(conversation.lastMessageTime)}</span>
                  </div>
                  <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">{conversation.item.name}</p>
                  <p className="text-sm text-muted-foreground truncate mt-1">{conversation.lastMessage}</p>
                </div>
                {conversation.unreadCount > 0 && (
                  <Badge className="bg-teal-500 hover:bg-teal-600 text-white text-xs">{conversation.unreadCount}</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedConversation.participant.avatar || "/placeholder.svg"}
                      alt={selectedConversation.participant.name}
                    />
                    <AvatarFallback>
                      {selectedConversation.participant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedConversation.participant.name}</h3>
                    <p className="text-sm text-muted-foreground">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Info className="h-4 w-4" />
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
                      src={selectedConversation.item.image || "/placeholder.svg"}
                      alt={selectedConversation.item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{selectedConversation.item.name}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-lg font-semibold text-teal-600">
                          ${selectedConversation.item.price}/day
                        </span>
                        <Badge variant={selectedConversation.item.status === "borrowed" ? "default" : "secondary"}>
                          {selectedConversation.item.status === "borrowed" ? "You borrowed this" : "Your listing"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Rental period: {selectedConversation.item.period}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex", message.senderId === "currentUser" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                      message.senderId === "currentUser" ? "bg-teal-500 text-white" : "bg-muted",
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={cn(
                        "text-xs mt-1",
                        message.senderId === "currentUser" ? "text-teal-100" : "text-muted-foreground",
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
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium">Select a conversation</h3>
              <p className="text-muted-foreground">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
