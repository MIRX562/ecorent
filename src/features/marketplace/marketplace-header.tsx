import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useItemStore } from "./store/marketplace-store";

export default function MarketplaceHeader() {
  const { searchQuery, setSearchQuery } = useItemStore();
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Link href="/" className="hidden md:flex items-center gap-2">
        <span className="text-xl font-bold bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
          EcoRent
        </span>
      </Link>
      <div className="relative flex-1 max-w-xl mx-auto">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for items..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-9 w-9"
          onClick={() => setSearchQuery("")}
        >
          {searchQuery && <X className="h-4 w-4" />}
          <span className="sr-only">Clear search</span>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Button variant="outline">Dashboard</Button>
        </Link>
      </div>
    </header>
  );
}
