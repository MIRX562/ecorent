import Image from "next/image"
import {
  DollarSign,
  Package,
  ShoppingCart,
  Star,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, John! Here's an overview of your EcoRent activity.</p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,248.50</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">+2</span> new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-amber-500 font-medium">1</span> due this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.9/5</div>
            <p className="text-xs text-muted-foreground">
              Based on <span className="font-medium">24</span> reviews
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        {/* Main content - 4 columns on md+ */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* Recent activity */}
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-1">
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent transactions and updates</CardDescription>
              </div>
              <div className="ml-auto">
                <Tabs defaultValue="all">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="listings">Listings</TabsTrigger>
                    <TabsTrigger value="rentals">Rentals</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-green-100 dark:bg-green-900/20">
                    <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Payment Received</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You received $45.00 for renting out your Camping Tent
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900/20">
                    <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">New Rental Request</p>
                      <p className="text-sm text-muted-foreground">Yesterday</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Sarah M. wants to rent your Mountain Bike for 3 days
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-amber-100 dark:bg-amber-900/20">
                    <Star className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">New Review</p>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Ryan K. left a 5-star review for your DSLR Camera</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-teal-100 dark:bg-teal-900/20">
                    <Package className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">New Listing</p>
                      <p className="text-sm text-muted-foreground">3 days ago</p>
                    </div>
                    <p className="text-sm text-muted-foreground">You listed "Power Drill Set" for $15/day</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Activity
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* My Listings */}
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-1">
                <CardTitle>My Listings</CardTitle>
                <CardDescription>Manage your rental items</CardDescription>
              </div>
              <Button
                size="sm"
                className="ml-auto bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="rounded-lg border overflow-hidden">
                    <div className="relative h-40 w-full">
                      <Image
                        src="/placeholder.svg?height=160&width=320"
                        alt="Camping Tent"
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">Active</Badge>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Camping Tent</h3>
                          <p className="text-sm text-muted-foreground">4-Person Waterproof</p>
                        </div>
                        <p className="font-medium text-teal-600 dark:text-teal-400">$25/day</p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>Rented 8 times</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border overflow-hidden">
                    <div className="relative h-40 w-full">
                      <Image
                        src="/placeholder.svg?height=160&width=320"
                        alt="Mountain Bike"
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">Active</Badge>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Mountain Bike</h3>
                          <p className="text-sm text-muted-foreground">Trek 21-Speed</p>
                        </div>
                        <p className="font-medium text-teal-600 dark:text-teal-400">$35/day</p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>Rented 12 times</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Listings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Sidebar - 3 columns on md+ */}
        <div className="md:col-span-3 flex flex-col gap-6">
          {/* Profile summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">Member since May 2023</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    <span className="ml-1 text-xs text-muted-foreground">(24 reviews)</span>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Profile Completion</p>
                  <p className="text-sm font-medium">85%</p>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <p className="text-sm">Email verified</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <p className="text-sm">Phone verified</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <p className="text-sm">ID verified</p>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Payment method (Add)</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Complete Your Profile
              </Button>
            </CardContent>
          </Card>

          {/* Rental Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Rental Requests</CardTitle>
              <CardDescription>Pending requests for your items</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sarah M." />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Sarah M.</p>
                      <Badge>New</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Wants to rent your Mountain Bike</p>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  <p>May 25 - May 28 (3 days)</p>
                  <p className="font-medium text-foreground mt-1">$105.00 total</p>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
                  >
                    Accept
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Decline
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Ryan K." />
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Ryan K.</p>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Wants to rent your Power Drill Set</p>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  <p>May 22 - May 23 (1 day)</p>
                  <p className="font-medium text-foreground mt-1">$15.00 total</p>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
                  >
                    Accept
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Decline
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Requests
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* Upcoming Returns */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Returns</CardTitle>
              <CardDescription>Items due to be returned soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full p-2 bg-amber-100 dark:bg-amber-900/20">
                    <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">DSLR Camera</p>
                    <p className="text-xs text-muted-foreground">Due in 2 days (May 21)</p>
                    <p className="text-xs text-muted-foreground mt-1">Rented by James D.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full p-2 bg-green-100 dark:bg-green-900/20">
                    <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Portable Speaker</p>
                    <p className="text-xs text-muted-foreground">Due in 5 days (May 24)</p>
                    <p className="text-xs text-muted-foreground mt-1">Rented by Alex T.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
