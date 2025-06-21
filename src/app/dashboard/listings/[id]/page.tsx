"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter, useParams } from "next/navigation"
import {
  ArrowLeft,
  Edit,
  Trash,
  Eye,
  EyeOff,
  Clock,
  Calendar,
  DollarSign,
  MapPin,
  Tag,
  MessageSquare,
  Share,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Users,
  Star,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
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
} from "@/components/ui/alert-dialog"
import { Progress } from "@/components/ui/progress"

// Sample listing data (in a real app, this would be fetched based on the ID)
const listingData = {
  id: 1,
  title: "Mountain Bike",
  description:
    "Trek 21-Speed Mountain Bike in excellent condition. Perfect for trail riding or commuting. Includes a bike lock and helmet. Recently serviced with new brakes and tires.",
  price: 35,
  priceUnit: "day",
  deposit: 150,
  images: [
    "/placeholder.svg?height=500&width=800",
    "/placeholder.svg?height=500&width=800",
    "/placeholder.svg?height=500&width=800",
    "/placeholder.svg?height=500&width=800",
  ],
  category: "Sports",
  location: "Portland, OR",
  distance: 1.2,
  status: "active",
  condition: "Excellent",
  features: [
    "21-speed Shimano gears",
    "Front suspension",
    "Disc brakes",
    "Adjustable seat height",
    "Includes bike lock",
    "Includes helmet",
  ],
  rules: [
    "Return in clean condition",
    "No off-road trails (city trails only)",
    "Report any damage immediately",
    "ID required for rental",
    "Security deposit required",
  ],
  availability: {
    available: true,
    nextAvailable: "Available now",
    booked: ["2023-05-28 to 2023-05-30", "2023-06-10 to 2023-06-12"],
  },
  stats: {
    views: 245,
    inquiries: 18,
    rentals: 12,
    revenue: 420,
    rating: 4.9,
    reviewCount: 8,
  },
  rentalHistory: [
    {
      id: 1,
      renter: {
        name: "Alex T.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      startDate: "May 15, 2023",
      endDate: "May 17, 2023",
      duration: "3 days",
      amount: 105,
      status: "completed",
    },
    {
      id: 2,
      renter: {
        name: "Jamie L.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      startDate: "Apr 28, 2023",
      endDate: "Apr 30, 2023",
      duration: "3 days",
      amount: 105,
      status: "completed",
    },
    {
      id: 3,
      renter: {
        name: "Chris P.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      startDate: "Apr 10, 2023",
      endDate: "Apr 12, 2023",
      duration: "3 days",
      amount: 105,
      status: "completed",
    },
  ],
  reviews: [
    {
      id: 1,
      user: {
        name: "Alex T.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "May 18, 2023",
      comment: "Great bike! Was in excellent condition and perfect for my weekend trip.",
    },
    {
      id: 2,
      user: {
        name: "Jamie L.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "May 1, 2023",
      comment: "The bike was clean and well-maintained. The owner was very helpful with pickup and return.",
    },
    {
      id: 3,
      user: {
        name: "Chris P.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4,
      date: "April 13, 2023",
      comment: "Good bike, worked well for my needs. The included lock was very convenient.",
    },
  ],
  pendingRequests: [
    {
      id: 1,
      renter: {
        name: "Sarah M.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      startDate: "May 25, 2023",
      endDate: "May 28, 2023",
      duration: "4 days",
      amount: 140,
      message: "Hi! I'd like to rent your bike for a long weekend trip. Is it available?",
    },
  ],
  createdAt: "January 15, 2023",
  updatedAt: "March 10, 2023",
}

export default function ListingDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [isActive, setIsActive] = useState(listingData.status === "active")

  // In a real app, you would fetch the listing data based on the ID
  const listingId = params.id

  const handleStatusToggle = () => {
    setIsActive(!isActive)
    // In a real app, you would update the status in the database
  }

  const handleDelete = () => {
    // In a real app, you would delete the listing from the database
    router.push("/dashboard/listings")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{listingData.title}</h1>
          <Badge className={isActive ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={isActive ? "text-amber-500 border-amber-200" : "text-green-500 border-green-200"}
            onClick={handleStatusToggle}
          >
            {isActive ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Deactivate
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Activate
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/listings/edit/${listingId}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-red-500 border-red-200">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your listing and remove it from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content - 2 columns on lg+ */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image gallery */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={listingData.images[selectedImage] || "/placeholder.svg"}
                  alt={listingData.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {listingData.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 ${
                      selectedImage === index ? "border-teal-500" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${listingData.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Listing details */}
          <Card>
            <CardHeader>
              <CardTitle>Listing Details</CardTitle>
              <CardDescription>
                Created on {listingData.createdAt} • Last updated on {listingData.updatedAt}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Price</span>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-teal-500 mr-1" />
                    <span className="font-medium">
                      ${listingData.price}/{listingData.priceUnit}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Security Deposit</span>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-teal-500 mr-1" />
                    <span className="font-medium">${listingData.deposit}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 text-teal-500 mr-1" />
                    <span className="font-medium">{listingData.category}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Location</span>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-teal-500 mr-1" />
                    <span className="font-medium">{listingData.location}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Condition</span>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-teal-500 mr-1" />
                    <span className="font-medium">{listingData.condition}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Availability</span>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-teal-500 mr-1" />
                    <span className="font-medium">{listingData.availability.nextAvailable}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{listingData.description}</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-2">Features</h3>
                  <ul className="space-y-1">
                    {listingData.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-muted-foreground">
                        <ChevronRight className="h-4 w-4 text-teal-500 mr-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Rental Rules</h3>
                  <ul className="space-y-1">
                    {listingData.rules.map((rule, index) => (
                      <li key={index} className="flex items-center text-sm text-muted-foreground">
                        <ChevronRight className="h-4 w-4 text-teal-500 mr-1 flex-shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Booked Dates</h3>
                {listingData.availability.booked.length > 0 ? (
                  <ul className="space-y-1">
                    {listingData.availability.booked.map((date, index) => (
                      <li key={index} className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-amber-500 mr-1 flex-shrink-0" />
                        <span>{date}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No bookings scheduled.</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => router.push(`/marketplace/${listingId}`)}>
                <Eye className="mr-2 h-4 w-4" />
                View Public Listing
              </Button>
            </CardFooter>
          </Card>

          {/* Tabs for rental history, reviews, etc. */}
          <Tabs defaultValue="requests" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="requests">Rental Requests</TabsTrigger>
              <TabsTrigger value="history">Rental History</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="requests" className="space-y-4 pt-4">
              {listingData.pendingRequests.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-muted p-3 mb-2">
                    <MessageSquare className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No Pending Requests</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You don't have any pending rental requests for this item.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {listingData.pendingRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={request.renter.avatar || "/placeholder.svg"} alt={request.renter.name} />
                            <AvatarFallback>{request.renter.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{request.renter.name}</h3>
                              <Badge>New Request</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {request.startDate} - {request.endDate} ({request.duration})
                            </p>
                            <p className="text-sm font-medium">${request.amount} total</p>
                            <p className="text-sm text-muted-foreground">{request.message}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2 justify-end">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                Message
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Message {request.renter.name}</DialogTitle>
                                <DialogDescription>
                                  Send a message to discuss details about the rental request.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <textarea
                                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  placeholder="Type your message here..."
                                />
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button>Send Message</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm" className="text-red-500 border-red-200">
                            Decline
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
                          >
                            Accept
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-4 pt-4">
              {listingData.rentalHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-muted p-3 mb-2">
                    <Clock className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No Rental History</h3>
                  <p className="text-sm text-muted-foreground mt-1">This item hasn't been rented out yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {listingData.rentalHistory.map((rental) => (
                    <Card key={rental.id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={rental.renter.avatar || "/placeholder.svg"} alt={rental.renter.name} />
                            <AvatarFallback>{rental.renter.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{rental.renter.name}</h3>
                              <Badge
                                variant="outline"
                                className="text-green-600 border-green-200 bg-green-50 hover:bg-green-100 dark:text-green-400 dark:border-green-900 dark:bg-green-950/20"
                              >
                                {rental.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {rental.startDate} - {rental.endDate} ({rental.duration})
                            </p>
                            <p className="text-sm font-medium">${rental.amount} total</p>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2 justify-end">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4 pt-4">
              {listingData.reviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-muted p-3 mb-2">
                    <Star className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No Reviews Yet</h3>
                  <p className="text-sm text-muted-foreground mt-1">This item hasn't received any reviews yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= Math.round(listingData.stats.rating)
                                ? "fill-amber-500 text-amber-500"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{listingData.stats.rating}</span>
                      <span className="text-muted-foreground">({listingData.stats.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <Separator />

                  {listingData.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} />
                          <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{review.user.name}</p>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="mt-2 text-sm">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 1 column on lg+ */}
        <div className="lg:col-span-1 space-y-6">
          {/* Performance stats */}
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>Statistics for this listing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <div className="flex items-center">
                    <Eye className="mr-2 h-4 w-4 text-teal-500" />
                    <span className="text-2xl font-bold">{listingData.stats.views}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Inquiries</p>
                  <div className="flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4 text-teal-500" />
                    <span className="text-2xl font-bold">{listingData.stats.inquiries}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Rentals</p>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-teal-500" />
                    <span className="text-2xl font-bold">{listingData.stats.rentals}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-teal-500" />
                    <span className="text-2xl font-bold">${listingData.stats.revenue}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Conversion Rate</p>
                  <p className="text-sm font-medium">
                    {Math.round((listingData.stats.rentals / listingData.stats.views) * 100)}%
                  </p>
                </div>
                <Progress
                  value={Math.round((listingData.stats.rentals / listingData.stats.views) * 100)}
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">
                  {listingData.stats.rentals} rentals from {listingData.stats.views} views
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Detailed Analytics
              </Button>
            </CardFooter>
          </Card>

          {/* Quick actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700">
                <Edit className="mr-2 h-4 w-4" />
                Edit Listing
              </Button>
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Manage Availability
              </Button>
              <Button variant="outline" className="w-full">
                <Share className="mr-2 h-4 w-4" />
                Share Listing
              </Button>
              <Button variant="outline" className="w-full">
                <DollarSign className="mr-2 h-4 w-4" />
                Update Pricing
              </Button>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Tips to Improve</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="rounded-full p-1 bg-amber-100 dark:bg-amber-900/20">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Add more photos</p>
                  <p className="text-xs text-muted-foreground">Listings with 5+ photos get 2x more rental requests.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full p-1 bg-teal-100 dark:bg-teal-900/20">
                  <CheckCircle2 className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Great response time</p>
                  <p className="text-xs text-muted-foreground">
                    You respond to inquiries within 2 hours on average. Keep it up!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full p-1 bg-amber-100 dark:bg-amber-900/20">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Expand your description</p>
                  <p className="text-xs text-muted-foreground">
                    Add more details about the condition and specific features.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
