"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  MapPin,
  Star,
  Search,
  Filter,
  Grid,
  List,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { usePixabayImage } from "@/hooks/use-pixabay-image";

// Sample saved items data
const savedItems = [
  {
    id: 1,
    title: "Mountain Bike",
    description: "Trek 21-Speed Mountain Bike in excellent condition",
    price: 35,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "sports",
    location: "Portland, OR",
    distance: 1.2,
    rating: 4.9,
    reviews: 12,
    owner: {
      name: "Sarah M.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
    savedDate: "2024-01-15",
    available: true,
  },
  {
    id: 2,
    title: "DSLR Camera",
    description: "Canon EOS with 2 lenses and carrying case",
    price: 50,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "electronics",
    location: "Portland, OR",
    distance: 2.5,
    rating: 4.7,
    reviews: 8,
    owner: {
      name: "John D.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
    },
    savedDate: "2024-01-12",
    available: true,
  },
  {
    id: 3,
    title: "Camping Tent",
    description: "4-Person Waterproof Tent with easy setup",
    price: 25,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "outdoor",
    location: "Portland, OR",
    distance: 3.7,
    rating: 4.8,
    reviews: 15,
    owner: {
      name: "Ryan K.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
    },
    savedDate: "2024-01-10",
    available: false,
  },
  {
    id: 4,
    title: "Kayak",
    description: "Single-person kayak with paddle and life vest",
    price: 40,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "outdoor",
    location: "Portland, OR",
    distance: 4.2,
    rating: 4.9,
    reviews: 10,
    owner: {
      name: "Alex T.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
    savedDate: "2024-01-08",
    available: true,
  },
  {
    id: 5,
    title: "Projector",
    description: "HD Projector with HDMI and Bluetooth connectivity",
    price: 30,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "electronics",
    location: "Portland, OR",
    distance: 2.1,
    rating: 4.7,
    reviews: 9,
    owner: {
      name: "Jamie L.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
    },
    savedDate: "2024-01-05",
    available: true,
  },
  {
    id: 6,
    title: "Electric Scooter",
    description: "Foldable electric scooter with 25-mile range",
    price: 45,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "vehicles",
    location: "Portland, OR",
    distance: 1.9,
    rating: 4.8,
    reviews: 14,
    owner: {
      name: "Chris P.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
    },
    savedDate: "2024-01-03",
    available: true,
  },
];

const categories = [
  { id: "all", name: "All Items" },
  { id: "electronics", name: "Electronics" },
  { id: "outdoor", name: "Outdoor Gear" },
  { id: "sports", name: "Sports Equipment" },
  { id: "vehicles", name: "Vehicles" },
];

function SavedItemCard({
  item,
  removeFromSaved,
  formatDate,
}: {
  item: (typeof savedItems)[0];
  removeFromSaved: (id: number) => void;
  formatDate: (date: string) => string;
}) {
  const pixabayImg = usePixabayImage(
    item.title,
    item.image || "/placeholder.svg"
  );
  return (
    <Card className="overflow-hidden group w-full max-w-full">
      <div className="relative w-full">
        <Link href={`/marketplace/${item.id}`} className="block w-full">
          <Image
            src={pixabayImg}
            alt={item.title}
            width={400}
            height={300}
            className="object-cover w-full h-32 sm:h-48"
            sizes="(max-width: 640px) 100vw, 400px"
          />
          <Badge className="absolute bottom-2 left-2 bg-black/50 hover:bg-black/60 text-white">
            ${item.price}/{item.priceUnit}
          </Badge>
        </Link>
        {!item.available && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            Unavailable
          </Badge>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
            >
              <Heart className="h-4 w-4 fill-current" />
              <span className="sr-only">Remove from saved</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove from saved items?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove &quot;{item.title}&quot; from your saved items.
                You can always save it again later.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => removeFromSaved(item.id)}
                className="bg-red-500 hover:bg-red-600"
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <Link href={`/marketplace/${item.id}`}>
          <CardContent className="p-4 flex-1">
            <div className="space-y-1">
              <h3 className="font-medium truncate">{item.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center text-sm">
                <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {item.distance} miles
                </span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span className="ml-1 text-sm font-medium">{item.rating}</span>
                <span className="ml-1 text-xs text-muted-foreground">
                  ({item.reviews})
                </span>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Saved on {formatDate(item.savedDate)}
            </div>
          </CardContent>
        </Link>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={item.owner.avatar || "/placeholder.svg"}
                alt={item.owner.name}
              />
              <AvatarFallback>{item.owner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              {item.owner.name}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                // Navigate to messages
              }}
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              Message
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
              disabled={!item.available}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (item.available) {
                  window.location.href = `/marketplace/${item.id}?rent=true`;
                }
              }}
            >
              {item.available ? "Rent Now" : "Unavailable"}
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}

export default function SavedItemsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [items, setItems] = useState(savedItems);

  // Filter items based on search query and active category
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const removeFromSaved = (itemId: number) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6 mx-auto max-w-7xl w-full px-2 sm:px-4">
      {/* Header */}
      <div className="flex gap-4 flex-row items-center justify-between w-full">
        <div>
          <h1 className="text-2xl font-bold">Saved Items</h1>
          <p className="text-muted-foreground">Items you've saved for later</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {filteredItems.length} items
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 items-center w-full">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search saved items..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Sort By
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Recently Saved</DropdownMenuItem>
              <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
              <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
              <DropdownMenuItem>Distance: Nearest</DropdownMenuItem>
              <DropdownMenuItem>Rating: Highest</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Categories */}
      <div className="overflow-x-auto pb-2 max-w-[90vw] md:max-w-full">
        <Tabs
          defaultValue="all"
          value={activeCategory}
          onValueChange={setActiveCategory}
        >
          <TabsList className="h-auto p-1 bg-transparent">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="px-3 py-1.5 text-sm data-[state=active]:bg-teal-50 data-[state=active]:text-teal-600 dark:data-[state=active]:bg-teal-950/50 dark:data-[state=active]:text-teal-400"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-6 mb-4">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No saved items found</h3>
          <p className="text-muted-foreground mt-1 mb-4 max-w-md">
            {searchQuery || activeCategory !== "all"
              ? "No items match your current filters. Try adjusting your search or category."
              : "You haven't saved any items yet. Start browsing the marketplace to save items you're interested in."}
          </p>
          <Link href="/marketplace">
            <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700">
              Browse Marketplace
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-full">
          {filteredItems.map((item) => (
            <SavedItemCard
              key={item.id}
              item={item}
              removeFromSaved={removeFromSaved}
              formatDate={formatDate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
