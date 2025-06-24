"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Heart,
  Share,
  Star,
  MapPin,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import BookingCard from "./marketplace-item-bookingcard";

const itemData = {
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
  category: "sports",
  location: "Portland, OR",
  distance: 1.2,
  rating: 4.9,
  reviewCount: 12,
  owner: {
    id: 101,
    name: "Sarah M.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    responseRate: 98,
    responseTime: "within an hour",
    memberSince: "May 2022",
    verified: true,
  },
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
  reviewsList: [
    {
      id: 1,
      user: {
        name: "Alex T.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "May 10, 2023",
      comment:
        "Great bike! Was perfect for my weekend trip. Sarah was very helpful with pickup and return.",
    },
    {
      id: 2,
      user: {
        name: "Jamie L.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "April 28, 2023",
      comment:
        "Excellent condition and Sarah was flexible with the pickup time. Would rent again!",
    },
    {
      id: 3,
      user: {
        name: "Chris P.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4,
      date: "April 15, 2023",
      comment:
        "Good bike, worked well for my needs. The included lock was very convenient.",
    },
  ],
  similarItems: [
    {
      id: 101,
      title: "Road Bike",
      price: 30,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
    },
    {
      id: 102,
      title: "Electric Scooter",
      price: 45,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
    },
    {
      id: 103,
      title: "Skateboard",
      price: 15,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
    },
  ],
};

export default function ItemDetailView() {
  const params = useParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [pixabayImages, setPixabayImages] = useState<string[]>([]);
  const [bookingOpen, setBookingOpen] = useState(false);

  // In a real app, you would fetch the item data based on the ID
  const itemId = params.id;

  useEffect(() => {
    async function fetchPixabayImages() {
      try {
        const res = await fetch(
          `https://pixabay.com/api/?key=50978905-d1ce30881d322635459928df1&q=${encodeURIComponent(
            itemData.title
          )}&image_type=photo&per_page=4`
        );
        const data = await res.json();
        if (data.hits && data.hits.length > 0) {
          setPixabayImages(data.hits.map((hit: any) => hit.webformatURL));
        }
      } catch (e) {
        // fallback to placeholder
        setPixabayImages([]);
      }
    }
    fetchPixabayImages();
  }, []);

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">{itemData.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={saved ? "text-red-500" : ""}
            onClick={handleSave}
          >
            <Heart className={`h-5 w-5 ${saved ? "fill-current" : ""}`} />
            <span className="sr-only">{saved ? "Unsave" : "Save"}</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Share className="h-5 w-5" />
            <span className="sr-only">Share</span>
          </Button>
        </div>
      </header>

      <main className="container py-6 px-2 mx-auto ">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Item images and details - 2 columns on lg+ */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image gallery */}
            <div className="space-y-2">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={
                    pixabayImages[selectedImage] ||
                    itemData.images[selectedImage] ||
                    "/placeholder.svg"
                  }
                  alt={itemData.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {(pixabayImages.length > 0
                  ? pixabayImages
                  : itemData.images
                ).map((image, index) => (
                  <button
                    key={index}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 ${
                      selectedImage === index
                        ? "border-teal-500"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${itemData.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Item details */}
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{itemData.title}</h1>
                <Badge className="text-base bg-gradient-to-r from-teal-500 to-cyan-600">
                  ${itemData.price}/{itemData.priceUnit}
                </Badge>
              </div>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span className="ml-1 text-sm font-medium">
                    {itemData.rating}
                  </span>
                  <span className="ml-1 text-sm text-muted-foreground">
                    ({itemData.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>
                    {itemData.location} ({itemData.distance} miles)
                  </span>
                </div>
              </div>
              <Separator className="my-4" />
              <p className="text-muted-foreground">{itemData.description}</p>
            </div>

            {/* Tabs for details, reviews, etc. */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="owner">Owner</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 pt-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="features">
                    <AccordionTrigger>Features</AccordionTrigger>
                    <AccordionContent>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {itemData.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <ChevronRight className="h-4 w-4 text-teal-500 mr-2" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="rules">
                    <AccordionTrigger>Rental Rules</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {itemData.rules.map((rule, index) => (
                          <li key={index} className="flex items-center">
                            <ChevronRight className="h-4 w-4 text-teal-500 mr-2" />
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="availability">
                    <AccordionTrigger>Availability</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">
                          Status:{" "}
                          <span className="text-green-500">Available Now</span>
                        </p>
                        <p className="text-sm">
                          Currently booked on the following dates:
                        </p>
                        <ul className="space-y-1">
                          {itemData.availability.booked.map((date, index) => (
                            <li
                              key={index}
                              className="text-sm text-muted-foreground"
                            >
                              • {date}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="deposit">
                    <AccordionTrigger>Security Deposit</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        This item requires a security deposit of{" "}
                        <strong>${itemData.deposit}</strong> which will be
                        refunded when the item is returned in its original
                        condition.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Reviews</h3>
                    <p className="text-sm text-muted-foreground">
                      {itemData.reviewsList.length} reviews for this item
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <span className="ml-1 text-lg font-medium">
                      {itemData.rating}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  {itemData.reviewsList.map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-4 last:border-0"
                    >
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage
                            src={review.user.avatar || "/placeholder.svg"}
                            alt={review.user.name}
                          />
                          <AvatarFallback>
                            {review.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{review.user.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {review.date}
                            </p>
                          </div>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-amber-500 text-amber-500"
                                    : "text-muted-foreground"
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
              </TabsContent>

              <TabsContent value="owner" className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={itemData.owner.avatar || "/placeholder.svg"}
                      alt={itemData.owner.name}
                    />
                    <AvatarFallback>
                      {itemData.owner.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-medium">{itemData.owner.name}</h3>
                      {itemData.owner.verified && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span className="ml-1 text-sm font-medium">
                        {itemData.owner.rating}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Member since {itemData.owner.memberSince}
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="font-medium">Response Rate</p>
                        <p className="text-muted-foreground">
                          {itemData.owner.responseRate}%
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Response Time</p>
                        <p className="text-muted-foreground">
                          {itemData.owner.responseTime}
                        </p>
                      </div>
                    </div>
                    <Button className="mt-4 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contact Owner
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Mobile booking trigger button and sheet */}
            <div className="lg:hidden mb-4">
              <Sheet open={bookingOpen} onOpenChange={setBookingOpen}>
                <SheetTrigger asChild>
                  <Button
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 mb-4"
                    onClick={() => setBookingOpen(true)}
                  >
                    Rent This Item
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="max-h-[90vh] overflow-y-auto p-0 rounded-t-2xl"
                >
                  <div className="p-4">
                    <BookingCard itemData={itemData} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Similar items */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Similar Items</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {itemData.similarItems.map((item) => (
                  <Link href={`/marketplace/${item.id}`} key={item.id}>
                    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                      <div className="relative h-32">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{item.title}</p>
                          <p className="text-sm font-medium text-teal-600 dark:text-teal-400">
                            ${item.price}/day
                          </p>
                        </div>
                        <div className="flex items-center mt-1">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                          <span className="ml-1 text-xs">{item.rating}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <BookingCard itemData={itemData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
