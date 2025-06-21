import Image from "next/image"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash, Eye, EyeOff, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ListingsPage() {
  // Sample listings data
  const listings = [
    {
      id: 1,
      title: "Camping Tent",
      description: "4-Person Waterproof Tent",
      price: 25,
      image: "/placeholder.svg?height=200&width=300",
      status: "active",
      rentals: 8,
      category: "Outdoor",
    },
    {
      id: 2,
      title: "Mountain Bike",
      description: "Trek 21-Speed",
      price: 35,
      image: "/placeholder.svg?height=200&width=300",
      status: "active",
      rentals: 12,
      category: "Sports",
    },
    {
      id: 3,
      title: "DSLR Camera",
      description: "Canon EOS with 2 lenses",
      price: 50,
      image: "/placeholder.svg?height=200&width=300",
      status: "active",
      rentals: 15,
      category: "Electronics",
    },
    {
      id: 4,
      title: "Power Drill Set",
      description: "Cordless with multiple bits",
      price: 15,
      image: "/placeholder.svg?height=200&width=300",
      status: "active",
      rentals: 6,
      category: "Tools",
    },
    {
      id: 5,
      title: "Portable Speaker",
      description: "Waterproof Bluetooth Speaker",
      price: 10,
      image: "/placeholder.svg?height=200&width=300",
      status: "inactive",
      rentals: 4,
      category: "Electronics",
    },
    {
      id: 6,
      title: "Snowboard",
      description: "Burton 158cm with bindings",
      price: 40,
      image: "/placeholder.svg?height=200&width=300",
      status: "inactive",
      rentals: 3,
      category: "Sports",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Listings</h1>
        <p className="text-muted-foreground">Manage your items available for rent</p>
      </div>

      {/* Filters and actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search listings..." className="pl-8" />
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
                <span>Status: Active</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Status: Inactive</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Category: Electronics</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Category: Sports</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Category: Tools</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Category: Outdoor</span>
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
              <SelectItem value="popularity">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700">
          <Plus className="mr-2 h-4 w-4" />
          Add New Listing
        </Button>
      </div>

      {/* Listings grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden">
            <div className="relative">
              <Image
                src={listing.image || "/placeholder.svg"}
                alt={listing.title}
                width={300}
                height={200}
                className="h-48 w-full object-cover"
              />
              <Badge
                className={`absolute top-2 right-2 ${
                  listing.status === "active" ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"
                }`}
              >
                {listing.status === "active" ? "Active" : "Inactive"}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 left-2 h-8 w-8 bg-black/20 hover:bg-black/30 text-white"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit Listing</span>
                  </DropdownMenuItem>
                  {listing.status === "active" ? (
                    <DropdownMenuItem>
                      <EyeOff className="mr-2 h-4 w-4" />
                      <span>Deactivate</span>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>Activate</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 focus:text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{listing.title}</h3>
                  <p className="text-sm text-muted-foreground">{listing.description}</p>
                </div>
                <p className="font-medium text-teal-600 dark:text-teal-400">${listing.price}/day</p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>Rented {listing.rentals} times</span>
                </div>
                <Badge variant="outline">{listing.category}</Badge>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
                >
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
