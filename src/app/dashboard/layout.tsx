"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Leaf,
  Home,
  Package,
  ShoppingCart,
  MessageSquare,
  Heart,
  Bell,
  Settings,
  LogOut,
  Menu,
  User,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "My Listings", href: "/dashboard/listings", icon: Package },
    { name: "My Rentals", href: "/dashboard/rentals", icon: ShoppingCart },
    { name: "Requests", href: "/dashboard/requests", icon: Clock },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Saved Items", href: "/dashboard/saved", icon: Heart },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  ]

  const userNavigation = [
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Logout", href: "/login", icon: LogOut },
  ]

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-40">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white dark:bg-gray-950 w-64">
          <div className="flex h-full flex-col">
            <div className="border-b px-6 py-4">
              <Link href="/" className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-teal-500" />
                <span className="text-lg font-bold bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                  EcoRent
                </span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid gap-1 px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                      pathname === item.href
                        ? "bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-t">
              <div className="px-2 py-2">
                <h3 className="px-3 text-xs font-medium text-muted-foreground">Account</h3>
                <nav className="grid gap-1 pt-1">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                        pathname === item.href
                          ? "bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs text-muted-foreground truncate">john.doe@example.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden border-r bg-white dark:bg-gray-950 md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col h-full">
          <div className="border-b px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-teal-500" />
              <span className="text-lg font-bold bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                EcoRent
              </span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                    pathname === item.href
                      ? "bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t">
            <div className="px-2 py-2">
              <h3 className="px-3 text-xs font-medium text-muted-foreground">Account</h3>
              <nav className="grid gap-1 pt-1">
                {userNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                      pathname === item.href
                        ? "bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs text-muted-foreground truncate">john.doe@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 md:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <div className="flex flex-1 items-center justify-end gap-4">
            <ThemeToggle />
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Avatar className="hidden md:block">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
