"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Download, TrendingUp, TrendingDown, DollarSign, Users, Package, Activity, BarChart3 } from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 12500, transactions: 145, users: 89 },
  { month: "Feb", revenue: 15800, transactions: 189, users: 112 },
  { month: "Mar", revenue: 18200, transactions: 234, users: 156 },
  { month: "Apr", revenue: 22100, transactions: 298, users: 203 },
  { month: "May", revenue: 25600, transactions: 356, users: 267 },
  { month: "Jun", revenue: 28900, transactions: 412, users: 334 },
]

const categoryData = [
  { name: "Electronics", value: 35, revenue: 45000, color: "#0d9488" },
  { name: "Vehicles", value: 25, revenue: 32000, color: "#14b8a6" },
  { name: "Tools", value: 20, revenue: 18000, color: "#2dd4bf" },
  { name: "Sports", value: 12, revenue: 12000, color: "#5eead4" },
  { name: "Others", value: 8, revenue: 8000, color: "#99f6e4" },
]

const userGrowthData = [
  { week: "Week 1", newUsers: 45, activeUsers: 234 },
  { week: "Week 2", newUsers: 52, activeUsers: 267 },
  { week: "Week 3", newUsers: 38, activeUsers: 298 },
  { week: "Week 4", newUsers: 61, activeUsers: 334 },
]

const topPerformers = [
  { name: "Sarah Johnson", earnings: 2450, listings: 8, rating: 4.8 },
  { name: "Michael Chen", earnings: 3200, listings: 12, rating: 4.9 },
  { name: "David Wilson", earnings: 1750, listings: 5, rating: 4.6 },
  { name: "Emily Rodriguez", earnings: 890, listings: 3, rating: 3.2 },
  { name: "Lisa Thompson", earnings: 1200, listings: 6, rating: 4.0 },
]

export default function ReportsAnalytics() {
  const [dateRange, setDateRange] = useState("last_30_days")
  const [reportType, setReportType] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive platform insights and analytics</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last_7_days">Last 7 days</SelectItem>
              <SelectItem value="last_30_days">Last 30 days</SelectItem>
              <SelectItem value="last_90_days">Last 90 days</SelectItem>
              <SelectItem value="last_year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$123,456</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              +12.5% vs last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">2,847</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              +8.2% vs last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Listings</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              +15.3% vs last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Transactions</p>
                <p className="text-2xl font-bold text-gray-900">1,934</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              -2.1% vs last period
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="listings">Listing Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue and transaction volume</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenue",
                      color: "#0d9488",
                    },
                    transactions: {
                      label: "Transactions",
                      color: "#14b8a6",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="revenue"
                        stackId="1"
                        stroke="#0d9488"
                        fill="#0d9488"
                        fillOpacity={0.6}
                      />
                      <Area
                        yAxisId="right"
                        type="monotone"
                        dataKey="transactions"
                        stackId="2"
                        stroke="#14b8a6"
                        fill="#14b8a6"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
                <CardDescription>Distribution of revenue across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Revenue",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="revenue"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Detailed revenue analysis by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryData.map((category) => (
                  <div key={category.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full" style={{ backgroundColor: category.color }}></div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{category.value}% of listings</Badge>
                      <span className="font-semibold">${category.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New user registrations and active users</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    newUsers: {
                      label: "New Users",
                      color: "#0d9488",
                    },
                    activeUsers: {
                      label: "Active Users",
                      color: "#14b8a6",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="newUsers" fill="#0d9488" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="activeUsers" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>User activity and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Daily Active Users</p>
                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">+5.2%</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average Session Duration</p>
                    <p className="text-2xl font-bold text-gray-900">12m 34s</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">+2.1%</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-600">User Retention Rate</p>
                    <p className="text-2xl font-bold text-gray-900">78.5%</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-red-100 text-red-800">-1.3%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="listings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Listing Performance</CardTitle>
              <CardDescription>Analysis of listing activity and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <Package className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                  <p className="text-sm text-gray-600">Total Listings</p>
                  <Badge className="mt-2 bg-green-100 text-green-800">+15.3%</Badge>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <Activity className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold text-gray-900">89.2%</p>
                  <p className="text-sm text-gray-600">Approval Rate</p>
                  <Badge className="mt-2 bg-green-100 text-green-800">+2.1%</Badge>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-2xl font-bold text-gray-900">456</p>
                  <p className="text-sm text-gray-600">Active Rentals</p>
                  <Badge className="mt-2 bg-yellow-100 text-yellow-800">-2.1%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>Highest earning users and their performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={performer.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-teal-100 text-teal-700 font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{performer.name}</h3>
                        <p className="text-sm text-gray-600">{performer.listings} listings</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="font-semibold text-gray-900">${performer.earnings}</p>
                        <p className="text-xs text-gray-600">Earnings</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-900">{performer.rating}</p>
                        <p className="text-xs text-gray-600">Rating</p>
                      </div>
                      <Badge
                        className={`${
                          performer.rating >= 4.5
                            ? "bg-green-100 text-green-800"
                            : performer.rating >= 4.0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {performer.rating >= 4.5 ? "Excellent" : performer.rating >= 4.0 ? "Good" : "Needs Improvement"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
