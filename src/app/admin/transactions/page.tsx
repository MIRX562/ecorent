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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MoreHorizontal,
  Eye,
  RefreshCw,
  Download,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Package,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"

const transactions = [
  {
    id: "TXN-001",
    type: "rental_payment",
    amount: 120.0,
    fee: 12.0,
    netAmount: 108.0,
    status: "completed",
    date: "2024-01-15T10:30:00Z",
    renter: {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    owner: {
      name: "Michael Chen",
      email: "michael.chen@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    item: "Professional DSLR Camera Kit",
    duration: "3 days",
    paymentMethod: "Credit Card (**** 4242)",
  },
  {
    id: "TXN-002",
    type: "payout",
    amount: 450.0,
    fee: 22.5,
    netAmount: 427.5,
    status: "pending",
    date: "2024-01-14T15:45:00Z",
    renter: null,
    owner: {
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    item: "Weekly earnings payout",
    duration: null,
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TXN-003",
    type: "refund",
    amount: 75.0,
    fee: 0.0,
    netAmount: 75.0,
    status: "completed",
    date: "2024-01-13T09:15:00Z",
    renter: {
      name: "David Wilson",
      email: "david.wilson@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    owner: {
      name: "Lisa Thompson",
      email: "lisa.thompson@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    item: "Mountain Bike - Trek X-Caliber",
    duration: "Cancelled rental",
    paymentMethod: "Credit Card (**** 1234)",
  },
  {
    id: "TXN-004",
    type: "rental_payment",
    amount: 200.0,
    fee: 20.0,
    netAmount: 180.0,
    status: "failed",
    date: "2024-01-12T14:20:00Z",
    renter: {
      name: "Alex Thompson",
      email: "alex.thompson@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    owner: {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    item: "Luxury Car - BMW 3 Series",
    duration: "2 days",
    paymentMethod: "Credit Card (**** 5678)",
  },
  {
    id: "TXN-005",
    type: "security_deposit",
    amount: 500.0,
    fee: 0.0,
    netAmount: 500.0,
    status: "held",
    date: "2024-01-11T11:00:00Z",
    renter: {
      name: "John Smith",
      email: "john.smith@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    owner: {
      name: "Michael Chen",
      email: "michael.chen@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    item: "Gaming Setup - Complete PC",
    duration: "Security hold",
    paymentMethod: "Credit Card (**** 9012)",
  },
]

export default function TransactionsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedTransaction, setSelectedTransaction] = useState<(typeof transactions)[0] | null>(null)

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.renter?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.owner?.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    const matchesType = typeFilter === "all" || transaction.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        )
      case "held":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1" />
            Held
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "rental_payment":
        return <CreditCard className="h-4 w-4 text-green-600" />
      case "payout":
        return <DollarSign className="h-4 w-4 text-blue-600" />
      case "refund":
        return <RefreshCw className="h-4 w-4 text-orange-600" />
      case "security_deposit":
        return <Package className="h-4 w-4 text-purple-600" />
      default:
        return <CreditCard className="h-4 w-4 text-gray-600" />
    }
  }

  const formatTransactionType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const totalRevenue = transactions
    .filter((t) => t.status === "completed" && t.type === "rental_payment")
    .reduce((sum, t) => sum + t.fee, 0)

  const totalVolume = transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction Management</h1>
          <p className="text-gray-600">Monitor and manage platform transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Volume</p>
                <p className="text-2xl font-bold text-gray-900">${totalVolume.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Platform Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payouts</p>
                <p className="text-2xl font-bold text-gray-900">$12,450</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <Clock className="h-3 w-3 text-yellow-500 mr-1" />
              23 pending transactions
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed Transactions</p>
                <p className="text-2xl font-bold text-gray-900">$2,340</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              -2.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Search and filter platform transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by transaction ID, item, or user..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="held">Held</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="rental_payment">Rental Payment</SelectItem>
                <SelectItem value="payout">Payout</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
                <SelectItem value="security_deposit">Security Deposit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transactions Table */}
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100">
                    {getTypeIcon(transaction.type)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{transaction.id}</h3>
                      {getStatusBadge(transaction.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span>{formatTransactionType(transaction.type)}</span>
                      <span className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        {transaction.item}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(transaction.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {transaction.renter && (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={transaction.renter.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {transaction.renter.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">{transaction.renter.name}</span>
                    </div>
                  )}

                  {transaction.owner && (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={transaction.owner.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {transaction.owner.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">{transaction.owner.name}</span>
                    </div>
                  )}

                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${transaction.amount.toFixed(2)}</p>
                    {transaction.fee > 0 && <p className="text-xs text-gray-500">Fee: ${transaction.fee.toFixed(2)}</p>}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedTransaction(transaction)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download Receipt
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {transaction.status === "pending" && (
                        <DropdownMenuItem className="text-green-600">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Process Transaction
                        </DropdownMenuItem>
                      )}
                      {transaction.status === "failed" && (
                        <DropdownMenuItem className="text-blue-600">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Retry Transaction
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details Dialog */}
      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>Detailed information about transaction {selectedTransaction?.id}</DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getTypeIcon(selectedTransaction.type)}
                  <div>
                    <h3 className="font-semibold">{selectedTransaction.id}</h3>
                    <p className="text-sm text-gray-600">{formatTransactionType(selectedTransaction.type)}</p>
                  </div>
                </div>
                {getStatusBadge(selectedTransaction.status)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Amount</Label>
                  <p className="text-lg font-semibold">${selectedTransaction.amount.toFixed(2)}</p>
                </div>
                <div>
                  <Label>Platform Fee</Label>
                  <p className="text-lg font-semibold">${selectedTransaction.fee.toFixed(2)}</p>
                </div>
                <div>
                  <Label>Net Amount</Label>
                  <p className="text-lg font-semibold text-green-600">${selectedTransaction.netAmount.toFixed(2)}</p>
                </div>
                <div>
                  <Label>Date</Label>
                  <p className="text-sm text-gray-600">{new Date(selectedTransaction.date).toLocaleString()}</p>
                </div>
                <div>
                  <Label>Item</Label>
                  <p className="text-sm text-gray-600">{selectedTransaction.item}</p>
                </div>
                <div>
                  <Label>Payment Method</Label>
                  <p className="text-sm text-gray-600">{selectedTransaction.paymentMethod}</p>
                </div>
              </div>

              {selectedTransaction.renter && (
                <div>
                  <Label>Renter</Label>
                  <div className="flex items-center gap-3 mt-2">
                    <Avatar>
                      <AvatarImage src={selectedTransaction.renter.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {selectedTransaction.renter.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedTransaction.renter.name}</p>
                      <p className="text-sm text-gray-600">{selectedTransaction.renter.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTransaction.owner && (
                <div>
                  <Label>Owner</Label>
                  <div className="flex items-center gap-3 mt-2">
                    <Avatar>
                      <AvatarImage src={selectedTransaction.owner.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {selectedTransaction.owner.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedTransaction.owner.name}</p>
                      <p className="text-sm text-gray-600">{selectedTransaction.owner.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedTransaction(null)}>
              Close
            </Button>
            <Button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700">
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
