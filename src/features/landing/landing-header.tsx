import { SmoothScrollLink } from "@/components/smooth-scroll-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <div className="container flex h-16 items-center justify-between py-4 mx-auto">
        <div className="flex items-center gap-2">
          <Image alt="logo" src="./icon0.svg" height={24} width={24} />
          <span className="text-xl font-bold bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
            EcoRent
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <SmoothScrollLink
            href="#features"
            className="text-sm font-medium hover:text-teal-500 transition-colors"
          >
            Features
          </SmoothScrollLink>
          <SmoothScrollLink
            href="#how-it-works"
            className="text-sm font-medium hover:text-teal-500 transition-colors"
          >
            How It Works
          </SmoothScrollLink>
          <SmoothScrollLink
            href="#testimonials"
            className="text-sm font-medium hover:text-teal-500 transition-colors"
          >
            Testimonials
          </SmoothScrollLink>
          <SmoothScrollLink
            href="#faq"
            className="text-sm font-medium hover:text-teal-500 transition-colors"
          >
            FAQ
          </SmoothScrollLink>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/auth/login"
            className="hidden md:block text-sm font-medium hover:text-teal-500 transition-colors"
          >
            Log in
          </Link>

          <Link href="/auth/register">
            <Button className="hidden md:inline-flex bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700">
              Sign up
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
