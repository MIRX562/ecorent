"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  Check,
  Clock,
  MessageSquare,
  Star,
  Trash2,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  XCircle,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePixabayImage } from "@/hooks/use-pixabay-image";

// Sample notifications data
const notifications = [
  {
    id: 1,
    type: "rental_request",
    title: "New rental request",
    message: "Sarah M. wants to rent your Mountain Bike for 3 days",
    timestamp: "2024-01-20T10:30:00Z",
    read: false,
    user: {
      name: "Sarah M.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    item: {
      name: "Mountain Bike",
      image: "/placeholder.svg?height=60&width=60",
    },
    actionUrl: "/dashboard/requests",
  },
  {
    id: 2,
    type: "message",
    title: "New message",
    message: "John D. sent you a message about the DSLR Camera",
    timestamp: "2024-01-20T09:15:00Z",
    read: false,
    user: {
      name: "John D.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    item: {
      name: "DSLR Camera",
      image: "/placeholder.svg?height=60&width=60",
    },
    actionUrl: "/dashboard/messages",
  },
  {
    id: 3,
    type: "rental_approved",
    title: "Rental request approved",
    message: "Your request to rent the Camping Tent has been approved",
    timestamp: "2024-01-19T16:45:00Z",
    read: true,
    user: {
      name: "Ryan K.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    item: {
      name: "Camping Tent",
      image: "/placeholder.svg?height=60&width=60",
    },
    actionUrl: "/dashboard/rentals",
  },
  {
    id: 4,
    type: "payment",
    title: "Payment received",
    message: "You received $105 for renting your Power Drill Set",
    timestamp: "2024-01-19T14:20:00Z",
    read: true,
    amount: 105,
    actionUrl: "/dashboard/earnings",
  },
  {
    id: 5,
    type: "review",
    title: "New review",
    message: "Alex T. left you a 5-star review for the Kayak rental",
    timestamp: "2024-01-19T11:30:00Z",
    read: true,
    user: {
      name: "Alex T.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    item: {
      name: "Kayak",
      image: "/placeholder.svg?height=60&width=60",
    },
    rating: 5,
    actionUrl: "/dashboard/reviews",
  },
  {
    id: 6,
    type: "rental_reminder",
    title: "Rental reminder",
    message: "Your Projector rental ends tomorrow. Don't forget to return it!",
    timestamp: "2024-01-18T18:00:00Z",
    read: true,
    item: {
      name: "Projector",
      image: "/placeholder.svg?height=60&width=60",
    },
    actionUrl: "/dashboard/rentals",
  },
  {
    id: 7,
    type: "rental_declined",
    title: "Rental request declined",
    message: "Your request to rent the Electric Scooter was declined",
    timestamp: "2024-01-18T15:30:00Z",
    read: true,
    user: {
      name: "Chris P.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    item: {
      name: "Electric Scooter",
      image: "/placeholder.svg?height=60&width=60",
    },
    actionUrl: "/dashboard/requests",
  },
  {
    id: 8,
    type: "system",
    title: "Profile verification complete",
    message:
      "Your profile has been successfully verified. You can now rent premium items!",
    timestamp: "2024-01-17T12:00:00Z",
    read: true,
    actionUrl: "/dashboard/profile",
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "rental_request":
      return <Clock className="h-4 w-4 text-blue-500" />;
    case "message":
      return <MessageSquare className="h-4 w-4 text-green-500" />;
    case "rental_approved":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "rental_declined":
      return <XCircle className="h-4 w-4 text-red-500" />;
    case "payment":
      return <DollarSign className="h-4 w-4 text-green-500" />;
    case "review":
      return <Star className="h-4 w-4 text-amber-500" />;
    case "rental_reminder":
      return <Calendar className="h-4 w-4 text-orange-500" />;
    case "system":
      return <AlertCircle className="h-4 w-4 text-blue-500" />;
    default:
      return <Bell className="h-4 w-4 text-gray-500" />;
  }
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  }
};

// Child component for notification item image with Pixabay hook
function NotificationItemImage({
  name,
  fallback,
}: {
  name: string;
  fallback: string;
}) {
  const imageUrl = usePixabayImage(name, fallback);
  return (
    <Image
      src={imageUrl}
      alt={name}
      width={40}
      height={40}
      className="rounded object-cover"
    />
  );
}

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notificationList.filter((n) => !n.read).length;

  const filteredNotifications = notificationList.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    return notification.type === activeTab;
  });

  const markAsRead = (id: number) => {
    setNotificationList((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationList((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotificationList((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotificationList([]);
  };

  return (
    <div className="space-y-2 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your rental activities
            {unreadCount > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400"
              >
                {unreadCount} unread
              </Badge>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <Check className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Notification Preferences</DropdownMenuItem>
              <DropdownMenuItem>Email Settings</DropdownMenuItem>
              <DropdownMenuItem>Push Notifications</DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={clearAllNotifications}
              >
                Clear All Notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Mobile: Dropdown for tabs */}
        <div className="block md:hidden mb-4">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter notifications" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="rental_request">Requests</SelectItem>
              <SelectItem value="message">Messages</SelectItem>
              <SelectItem value="payment">Payments</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Desktop: TabsList */}
        <TabsList className="hidden md:grid w-full grid-cols-6 lg:w-auto lg:grid-cols-none lg:flex">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-600 dark:data-[state=active]:bg-teal-950/50 dark:data-[state=active]:text-teal-400"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="unread"
            className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-600 dark:data-[state=active]:bg-teal-950/50 dark:data-[state=active]:text-teal-400"
          >
            Unread{" "}
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="rental_request"
            className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-600 dark:data-[state=active]:bg-teal-950/50 dark:data-[state=active]:text-teal-400"
          >
            Requests
          </TabsTrigger>
          <TabsTrigger
            value="message"
            className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-600 dark:data-[state=active]:bg-teal-950/50 dark:data-[state=active]:text-teal-400"
          >
            Messages
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-600 dark:data-[state=active]:bg-teal-950/50 dark:data-[state=active]:text-teal-400"
          >
            Payments
          </TabsTrigger>
          <TabsTrigger
            value="system"
            className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-600 dark:data-[state=active]:bg-teal-950/50 dark:data-[state=active]:text-teal-400"
          >
            System
          </TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="md:mt-6">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Bell className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No notifications</h3>
              <p className="text-muted-foreground mt-1 max-w-md">
                {activeTab === "unread"
                  ? "You're all caught up! No unread notifications."
                  : activeTab === "all"
                  ? "You don't have any notifications yet."
                  : `No ${activeTab.replace("_", " ")} notifications found.`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`transition-all hover:shadow-md ${
                    !notification.read
                      ? "border-l-4 border-l-teal-500 bg-teal-50/50 dark:bg-teal-950/10"
                      : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3
                                className={`text-sm font-medium ${
                                  !notification.read
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {notification.title}
                              </h3>
                              {!notification.read && (
                                <div className="h-2 w-2 rounded-full bg-teal-500" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>
                                {formatTimestamp(notification.timestamp)}
                              </span>
                              {notification.user && (
                                <div className="flex items-center gap-1">
                                  <Avatar className="h-4 w-4">
                                    <AvatarImage
                                      src={
                                        notification.user.avatar ||
                                        "/placeholder.svg"
                                      }
                                      alt={notification.user.name}
                                    />
                                    <AvatarFallback className="text-xs">
                                      {notification.user.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{notification.user.name}</span>
                                </div>
                              )}
                              {notification.rating && (
                                <div className="flex items-center gap-1">
                                  {Array.from({
                                    length: notification.rating,
                                  }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className="h-3 w-3 fill-amber-500 text-amber-500"
                                    />
                                  ))}
                                </div>
                              )}
                              {notification.amount && (
                                <Badge
                                  variant="secondary"
                                  className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                >
                                  +${notification.amount}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {notification.item && (
                              <div className="flex items-center gap-2 mr-2">
                                <NotificationItemImage
                                  name={notification.item.name}
                                  fallback={
                                    notification.item.image ||
                                    "/placeholder.svg"
                                  }
                                />
                                <span className="text-xs text-muted-foreground hidden sm:block">
                                  {notification.item.name}
                                </span>
                              </div>
                            )}
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-8 px-2"
                              >
                                <Check className="h-3 w-3" />
                                <span className="sr-only">Mark as read</span>
                              </Button>
                            )}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2 text-red-500 hover:text-red-600"
                                >
                                  <Trash2 className="h-3 w-3" />
                                  <span className="sr-only">
                                    Delete notification
                                  </span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete notification?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This notification will be permanently
                                    deleted and cannot be recovered.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      deleteNotification(notification.id)
                                    }
                                    className="bg-red-500 hover:bg-red-600"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                        {notification.actionUrl && (
                          <div className="mt-3">
                            <Link href={notification.actionUrl}>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
                              >
                                View Details
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
