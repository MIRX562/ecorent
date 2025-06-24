"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Package,
  Calendar,
  MapPin,
  Star,
  Flag,
} from "lucide-react"

const listings = [
  {
    id: 1,
    title: "Professional DSLR Camera Kit",
    category: "Electronics",
    price: 45,
    period: "day",
    owner: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 4.8,
    },
    location: "New York, NY",
    status: "active",
    createdAt: "2024-01-15",
    views: 234,
    bookings: 12,
    image: "/placeholder.svg?height=200&width=300",
    flagged: false,
  },
  {
    id: 2,
    title: "Mountain Bike - Trek X-Caliber",
    category: "Sports",
    price: 25,
    period: "day",
    owner: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 4.9,
    },
    location: "San Francisco, CA",
    status: "pending",
    createdAt: "2024-02-03",
    views: 156,
    bookings: 8,
    image: "/placeholder.svg?height=200&width=300",
    flagged: true,
  },
  {
    id: 3,
    title: "Power Drill Set with Accessories",
    category: "Tools",
    price: 15,
    period: "day",
    owner: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 4.6,
    },
    location: "Chicago, IL",
    status: "active",
    createdAt: "2024-01-28",
    views: 89,
    bookings: 15,
    image: "/placeholder.svg?height=200&width=300",
    flagged: false,
  },
  {
    id: 4,
    title: "Luxury Car - BMW 3 Series",
    category: "Vehicles",
    price: 120,
    period: "day",
    owner: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 3.2,
    },
    location: "Austin, TX",
    status: "suspended",
    createdAt: "2024-03-10",
    views: 445,
    bookings: 3,
    image: "/placeholder.svg?height=200&width=300",
    flagged: true,
  },
  {
    id: 5,
    title: "Gaming Setup - Complete PC",
    category: "Electronics",
    price: 80,
    period: "day",
    owner: {
      name: "Lisa Thompson",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 4.0,
    },
    location: "Miami, FL",
    status: "active",
    createdAt: "2024-02-20",
    views: 312,
    bookings: 7,
    image: "/placeholder.svg?height=200&width=300",
    flagged: false,
  },
]

export default function ListingsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedListing, setSelectedListing] = useState<(typeof listings)[0] | null>(null)
  const [actionDialog, setActionDialog] = useState<{
    open: boolean
    type: string
    listing: (typeof listings)[0] | null
  }>({
    open: false,
    type: "",
    listing: null,
  })

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.owner.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || listing.status === statusFilter
    const matchesCategory = categoryFilter === "all" || listing.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleAction = (type: string, listing: (typeof listings)[0]) => {
    setActionDialog({ open: true, type, listing })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Listings Management</h1>
          <p className="text-gray-600">Review and manage platform listings</p>
        </div>
        <Button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700">
          <Package className="h-4 w-4 mr-2" />
          Bulk Actions
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Listings</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900">1,089</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Flagged Items</p>
                <p className="text-2xl font-bold text-gray-900">56</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Flag className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Listings</CardTitle>
          <CardDescription>Search and filter platform listings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search listings by title or owner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Vehicles">Vehicles</SelectItem>
                <SelectItem value="Tools">Tools</SelectItem>
                <SelectItem value="Sports">Sports</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
                  {listing.flagged && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-red-500 text-white">
                        <Flag className="h-3 w-3 mr-1" />
                        Flagged
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-2 left-2">{getStatusBadge(listing.status)}</div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">{listing.title}</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedListing(listing)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {listing.status === "pending" && (
                          <>
                            <DropdownMenuItem
                              className="text-green-600"
                              onClick={() => handleAction("approve", listing)}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => handleAction("reject", listing)}>
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        {listing.status === "active" && (
                          <DropdownMenuItem className="text-red-600" onClick={() => handleAction("suspend", listing)}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Suspend
                          </DropdownMenuItem>
                        )}
                        {listing.status === "suspended" && (
                          <DropdownMenuItem
                            className="text-green-600"
                            onClick={() => handleAction("activate", listing)}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Activate
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{listing.category}</Badge>
                    <span className="text-lg font-bold text-teal-600">
                      ${listing.price}/{listing.period}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={listing.owner.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {listing.owner.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{listing.owner.name}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{listing.owner.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {listing.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(listing.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>{listing.views} views</span>
                      <span>{listing.bookings} bookings</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Dialog */}
      <Dialog open={actionDialog.open} onOpenChange={(open) => setActionDialog({ ...actionDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionDialog.type === "approve" && "Approve Listing"}
              {actionDialog.type === "reject" && "Reject Listing"}
              {actionDialog.type === "suspend" && "Suspend Listing"}
              {actionDialog.type === "activate" && "Activate Listing"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {actionDialog.type} "{actionDialog.listing?.title}"?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Reason (optional)</Label>
              <Textarea id="reason" placeholder="Enter reason for this action..." />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog({ ...actionDialog, open: false })}>
              Cancel
            </Button>
            <Button
              className={`${
                actionDialog.type === "approve" || actionDialog.type === "activate"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              Confirm {actionDialog.type}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Listing Details Dialog */}
      <Dialog open={!!selectedListing} onOpenChange={() => setSelectedListing(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Listing Details</DialogTitle>
            <DialogDescription>Detailed information about "{selectedListing?.title}"</DialogDescription>
          </DialogHeader>

          {selectedListing && (
            <div className="space-y-4">
              <img
                src={selectedListing.image || "/placeholder.svg"}
                alt={selectedListing.title}
                className="w-full h-64 object-cover rounded-lg"
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <p className="text-sm text-gray-600">{selectedListing.title}</p>
                </div>
                <div>
                  <Label>Category</Label>
                  <p className="text-sm text-gray-600">{selectedListing.category}</p>
                </div>
                <div>
                  <Label>Price</Label>
                  <p className="text-sm text-gray-600">
                    ${selectedListing.price}/{selectedListing.period}
                  </p>
                </div>
                <div>
                  <Label>Status</Label>
                  {getStatusBadge(selectedListing.status)}
                </div>
                <div>
                  <Label>Owner</Label>
                  <p className="text-sm text-gray-600">{selectedListing.owner.name}</p>
                </div>
                <div>
                  <Label>Location</Label>
                  <p className="text-sm text-gray-600">{selectedListing.location}</p>
                </div>
                <div>
                  <Label>Views</Label>
                  <p className="text-sm text-gray-600">{selectedListing.views}</p>
                </div>
                <div>
                  <Label>Bookings</Label>
                  <p className="text-sm text-gray-600">{selectedListing.bookings}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
