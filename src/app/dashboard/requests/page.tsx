"use client";

import Image from "next/image";
import {
  Search,
  Filter,
  Clock,
  Calendar,
  User,
  MapPin,
  Star,
  Check,
  X,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { usePixabayImage } from "@/hooks/use-pixabay-image";

// Child component for request item image with Pixabay hook
function RequestItemImage({
  title,
  fallback,
}: {
  title: string;
  fallback: string;
}) {
  const imageUrl = usePixabayImage(title, fallback);
  return <Image src={imageUrl} alt={title} fill className="object-cover" />;
}

export default function RequestsPage() {
  // Sample incoming requests data (people wanting to rent your items)
  const incomingRequests = [
    {
      id: 1,
      item: {
        title: "Mountain Bike",
        image: "/placeholder.svg?height=80&width=80",
        pricePerDay: 35,
      },
      requester: {
        name: "Sarah Mitchell",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
        reviewCount: 23,
        location: "Downtown, 2.1 miles away",
      },
      startDate: "May 25, 2023",
      endDate: "May 28, 2023",
      duration: 3,
      totalPrice: 105,
      message:
        "Hi! I'd love to rent your mountain bike for a weekend camping trip. I'm an experienced rider and will take great care of it.",
      requestedAt: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      item: {
        title: "DSLR Camera",
        image: "/placeholder.svg?height=80&width=80",
        pricePerDay: 50,
      },
      requester: {
        name: "Alex Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
        reviewCount: 31,
        location: "Midtown, 1.8 miles away",
      },
      startDate: "May 22, 2023",
      endDate: "May 24, 2023",
      duration: 2,
      totalPrice: 100,
      message:
        "I need this for a wedding photography gig. I'm a professional photographer with insurance coverage.",
      requestedAt: "5 hours ago",
      status: "pending",
    },
    {
      id: 3,
      item: {
        title: "Power Drill Set",
        image: "/placeholder.svg?height=80&width=80",
        pricePerDay: 15,
      },
      requester: {
        name: "Ryan Kumar",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
        reviewCount: 18,
        location: "Westside, 3.2 miles away",
      },
      startDate: "May 20, 2023",
      endDate: "May 21, 2023",
      duration: 1,
      totalPrice: 15,
      message:
        "Quick home repair project. Will pick up and return same day if possible.",
      requestedAt: "1 day ago",
      status: "pending",
    },
  ];

  // Sample outgoing requests data (your requests to rent others' items)
  const outgoingRequests = [
    {
      id: 4,
      item: {
        title: "Camping Tent",
        image: "/placeholder.svg?height=80&width=80",
        pricePerDay: 25,
      },
      owner: {
        name: "Emily Watson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
        reviewCount: 42,
        location: "Northside, 2.5 miles away",
      },
      startDate: "June 1, 2023",
      endDate: "June 4, 2023",
      duration: 3,
      totalPrice: 75,
      message:
        "Planning a family camping trip. We're experienced campers and will take excellent care of your tent.",
      requestedAt: "3 hours ago",
      status: "pending",
    },
    {
      id: 5,
      item: {
        title: "Projector",
        image: "/placeholder.svg?height=80&width=80",
        pricePerDay: 30,
      },
      owner: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
        reviewCount: 27,
        location: "Downtown, 1.2 miles away",
      },
      startDate: "May 26, 2023",
      endDate: "May 27, 2023",
      duration: 1,
      totalPrice: 30,
      message:
        "Need this for a business presentation. Will handle with care and return promptly.",
      requestedAt: "Yesterday",
      status: "approved",
    },
    {
      id: 6,
      item: {
        title: "Electric Scooter",
        image: "/placeholder.svg?height=80&width=80",
        pricePerDay: 25,
      },
      owner: {
        name: "Lisa Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.6,
        reviewCount: 19,
        location: "Eastside, 4.1 miles away",
      },
      startDate: "May 18, 2023",
      endDate: "May 20, 2023",
      duration: 2,
      totalPrice: 50,
      message:
        "Would love to try this for my daily commute. I'm a responsible rider with a clean record.",
      requestedAt: "2 days ago",
      status: "declined",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/20 dark:text-amber-400">
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400">
            Approved
          </Badge>
        );
      case "declined":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400">
            Declined
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleAcceptRequest = (requestId: number) => {
    console.log("Accepting request:", requestId);
    // Handle accept logic here
  };

  const handleDeclineRequest = (requestId: number) => {
    console.log("Declining request:", requestId);
    // Handle decline logic here
  };

  const handleCancelRequest = (requestId: number) => {
    console.log("Canceling request:", requestId);
    // Handle cancel logic here
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Rental Requests</h1>
        <p className="text-muted-foreground">
          Manage incoming and outgoing rental requests
        </p>
      </div>

      {/* Filters and actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search requests..."
              className="pl-8"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Status: Pending</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Status: Approved</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Status: Declined</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Date: Today</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Date: This week</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Date: This month</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Requests tabs */}
      <Tabs defaultValue="incoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="incoming">
            Incoming Requests
            <Badge className="ml-2 bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-900/20 dark:text-teal-400">
              {incomingRequests.filter((r) => r.status === "pending").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="outgoing">Outgoing Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="incoming" className="space-y-4">
          {incomingRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Clock className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No Incoming Requests</h3>
              <p className="text-muted-foreground mt-1 mb-4 max-w-md">
                When people want to rent your items, their requests will appear
                here.
              </p>
            </div>
          ) : (
            incomingRequests.map((request) => (
              <Card key={request.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    {/* Header with item and status */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                          <RequestItemImage
                            title={request.item.title}
                            fallback={request.item.image || "/placeholder.svg"}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {request.item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            ${request.item.pricePerDay}/day • {request.duration}{" "}
                            days
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(request.status)}
                        <p className="text-xs text-muted-foreground">
                          {request.requestedAt}
                        </p>
                      </div>
                    </div>

                    {/* Requester info */}
                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={request.requester.avatar || "/placeholder.svg"}
                          alt={request.requester.name}
                        />
                        <AvatarFallback>
                          {request.requester.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {request.requester.name}
                          </p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span className="text-sm text-muted-foreground">
                              {request.requester.rating} (
                              {request.requester.reviewCount})
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">
                            {request.requester.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Rental details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-teal-600" />
                        <div>
                          <p className="text-sm font-medium">Rental Period</p>
                          <p className="text-xs text-muted-foreground">
                            {request.startDate} - {request.endDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-teal-600" />
                        <div>
                          <p className="text-sm font-medium">Duration</p>
                          <p className="text-xs text-muted-foreground">
                            {request.duration} days
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-teal-600" />
                        <div>
                          <p className="text-sm font-medium">Total Price</p>
                          <p className="text-xs font-semibold text-teal-600">
                            ${request.totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <p className="text-sm font-medium mb-2">
                        Message from {request.requester.name.split(" ")[0]}:
                      </p>
                      <p className="text-sm text-muted-foreground italic">
                        &quot;{request.message}&quot;
                      </p>
                    </div>

                    {/* Actions */}
                    {request.status === "pending" && (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          onClick={() => handleAcceptRequest(request.id)}
                          className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Accept Request
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" className="flex-1">
                              <X className="mr-2 h-4 w-4" />
                              Decline
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Decline Request
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to decline this rental
                                request? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeclineRequest(request.id)}
                              >
                                Decline Request
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Button variant="outline" size="icon">
                          <MessageSquare className="h-4 w-4" />
                          <span className="sr-only">Message</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="outgoing" className="space-y-4">
          {outgoingRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Clock className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No Outgoing Requests</h3>
              <p className="text-muted-foreground mt-1 mb-4 max-w-md">
                Your requests to rent items from others will appear here.
              </p>
              <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700">
                Browse Items
              </Button>
            </div>
          ) : (
            outgoingRequests.map((request) => (
              <Card key={request.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    {/* Header with item and status */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                          <RequestItemImage
                            title={request.item.title}
                            fallback={request.item.image || "/placeholder.svg"}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {request.item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            ${request.item.pricePerDay}/day • {request.duration}{" "}
                            days
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(request.status)}
                        <p className="text-xs text-muted-foreground">
                          {request.requestedAt}
                        </p>
                      </div>
                    </div>

                    {/* Owner info */}
                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={request.owner.avatar || "/placeholder.svg"}
                          alt={request.owner.name}
                        />
                        <AvatarFallback>
                          {request.owner.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{request.owner.name}</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span className="text-sm text-muted-foreground">
                              {request.owner.rating} (
                              {request.owner.reviewCount})
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">
                            {request.owner.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Rental details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-teal-600" />
                        <div>
                          <p className="text-sm font-medium">Rental Period</p>
                          <p className="text-xs text-muted-foreground">
                            {request.startDate} - {request.endDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-teal-600" />
                        <div>
                          <p className="text-sm font-medium">Duration</p>
                          <p className="text-xs text-muted-foreground">
                            {request.duration} days
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-teal-600" />
                        <div>
                          <p className="text-sm font-medium">Total Price</p>
                          <p className="text-xs font-semibold text-teal-600">
                            ${request.totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Your message */}
                    <div className="p-4 bg-teal-50 dark:bg-teal-950/20 rounded-lg">
                      <p className="text-sm font-medium mb-2">Your message:</p>
                      <p className="text-sm text-muted-foreground italic">
                        &quot;{request.message}&quot;
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      {request.status === "pending" && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" className="flex-1">
                              <X className="mr-2 h-4 w-4" />
                              Cancel Request
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Cancel Request
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to cancel this rental
                                request? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                Keep Request
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleCancelRequest(request.id)}
                              >
                                Cancel Request
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                      {request.status === "approved" && (
                        <Button className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700">
                          <Calendar className="mr-2 h-4 w-4" />
                          View Rental Details
                        </Button>
                      )}
                      <Button variant="outline" size="icon">
                        <MessageSquare className="h-4 w-4" />
                        <span className="sr-only">Message</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
