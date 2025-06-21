import Image from "next/image"
import { Search, Filter, ArrowUpDown, Clock, AlertCircle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RentalsPage() {
  // Sample rentals data
  const activeRentals = [
    {
      id: 1,
      item: {
        title: "DSLR Camera",
        image: "/placeholder.svg?height=80&width=80",
      },
      owner: {
        name: "James D.",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      startDate: "May 15, 2023",
      endDate: "May 21, 2023",
      totalPrice: 300,
      status: "active",
      daysLeft: 2,
    },
    {
      id: 2,
      item: {
        title: "Portable Speaker",
        image: "/placeholder.svg?height=80&width=80",
      },
      owner: {
        name: "Alex T.",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      startDate: "May 19, 2023",
      endDate: "May 24, 2023",
      totalPrice: 50,
      status: "active",
      daysLeft: 5,
    },
  ]

  const pastRentals = [
    {
      id: 3,
      item: {
        title: "Electric Scooter",
        image: "/placeholder.svg?height=80&width=80",
      },
      owner: {
        name: "Sarah M.",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      startDate: "Apr 28, 2023",
      endDate: "May 5, 2023",
      totalPrice: 175,
      status: "completed",
    },
    {
      id: 4,
      item: {
        title: "Projector",
        image: "/placeholder.svg?height=80&width=80",
      },
      owner: {
        name: "Ryan K.",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      startDate: "Apr 15, 2023",
      endDate: "Apr 18, 2023",
      totalPrice: 90,
      status: "completed",
    },
    {
      id: 5,
      item: {
        title: "Kayak",
        image: "/placeholder.svg?height=80&width=80",
      },
      owner: {
        name: "Emily W.",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      startDate: "Apr 1, 2023",
      endDate: "Apr 3, 2023",
      totalPrice: 120,
      status: "completed",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Rentals</h1>
        <p className="text-muted-foreground">Manage the items you've rented from others</p>
      </div>

      {/* Filters and actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search rentals..." className="pl-8" />
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
                <span>Status: Completed</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Date: Last 30 days</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Date: Last 90 days</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Date: This year</span>
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
              <SelectItem value="end-date">End Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Export History
        </Button>
      </div>

      {/* Rentals tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="active">Active Rentals</TabsTrigger>
          <TabsTrigger value="past">Past Rentals</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeRentals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Calendar className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No Active Rentals</h3>
              <p className="text-muted-foreground mt-1 mb-4 max-w-md">
                You don't have any active rentals at the moment. Browse items to rent something new!
              </p>
              <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700">
                Browse Items
              </Button>
            </div>
          ) : (
            activeRentals.map((rental) => (
              <Card key={rental.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={rental.item.image || "/placeholder.svg"}
                        alt={rental.item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 grid gap-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{rental.item.title}</h3>
                        <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={rental.owner.avatar || "/placeholder.svg"} alt={rental.owner.name} />
                          <AvatarFallback>{rental.owner.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm text-muted-foreground">Rented from {rental.owner.name}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                          <span>
                            {rental.startDate} - {rental.endDate}
                          </span>
                        </div>
                        <div className="flex items-center">
                          {rental.daysLeft <= 2 ? (
                            <AlertCircle className="mr-1 h-3 w-3 text-amber-500" />
                          ) : (
                            <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                          )}
                          <span className={rental.daysLeft <= 2 ? "text-amber-500 font-medium" : ""}>
                            {rental.daysLeft} days left
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="font-medium">${rental.totalPrice.toFixed(2)}</p>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastRentals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Calendar className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No Rental History</h3>
              <p className="text-muted-foreground mt-1 mb-4 max-w-md">
                You haven't rented any items yet. Browse items to get started!
              </p>
              <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700">
                Browse Items
              </Button>
            </div>
          ) : (
            pastRentals.map((rental) => (
              <Card key={rental.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={rental.item.image || "/placeholder.svg"}
                        alt={rental.item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 grid gap-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{rental.item.title}</h3>
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-200 bg-green-50 hover:bg-green-100 dark:text-green-400 dark:border-green-900 dark:bg-green-950/20"
                        >
                          Completed
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={rental.owner.avatar || "/placeholder.svg"} alt={rental.owner.name} />
                          <AvatarFallback>{rental.owner.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm text-muted-foreground">Rented from {rental.owner.name}</p>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span>
                          {rental.startDate} - {rental.endDate}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="font-medium">${rental.totalPrice.toFixed(2)}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
                        >
                          Rent Again
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
