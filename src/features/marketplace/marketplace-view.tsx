"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useSearchParams } from "next/navigation";
import { items } from "./dummy";
import { useItemStore } from "./store/marketplace-store";
import MarketplaceHeader from "./marketplace-header";
import MarketplaceOptions from "./marketplace-options";
import MarketplaceCategories from "./marketplace-categories";
import MarketplaceMap from "./marketplace-map";

const PIXABAY_API_KEY = "50978905-d1ce30881d322635459928df1";

export default function MarketplaceView() {
  const searchParams = useSearchParams();
  const {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    viewMode,
    savedItems,
    setSavedItems,
    toggleSaved,
    visibleItems,
    setVisibleItems,
    isLoading,
    setIsLoading,
    getFilteredItems,
  } = useItemStore();

  const loaderRef = useRef<HTMLDivElement>(null);

  const filteredItems = getFilteredItems(items);

  // Pixabay image cache state
  const [pixabayImages, setPixabayImages] = useState<Record<number, string>>(
    {}
  );

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    const saved = items.filter((i) => i.saved).map((i) => i.id);
    setSavedItems(saved);
  }, [items]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (
          entry.isIntersecting &&
          !isLoading &&
          visibleItems < filteredItems.length
        ) {
          setIsLoading(true);
          // Simulate loading delay
          setTimeout(() => {
            setVisibleItems(
              visibleItems + 8 > filteredItems.length
                ? filteredItems.length
                : visibleItems + 8
            );
            setIsLoading(false);
          }, 800);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef, isLoading, visibleItems, items, searchQuery, activeCategory]);

  useEffect(() => {
    // Fetch images for visible items only if not already cached
    const fetchImages = async () => {
      const promises = filteredItems
        .slice(0, visibleItems)
        .map(async (item) => {
          if (!pixabayImages[item.id]) {
            try {
              const res = await fetch(
                `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
                  item.title
                )}&image_type=photo&per_page=3`
              );
              const data = await res.json();
              if (data.hits && data.hits.length > 0) {
                return { id: item.id, url: data.hits[0].webformatURL };
              }
            } catch {}
          }
          return null;
        });
      const results = await Promise.all(promises);
      const newImages: Record<number, string> = {};
      results.forEach((result) => {
        if (result) newImages[result.id] = result.url;
      });
      if (Object.keys(newImages).length > 0) {
        setPixabayImages((prev) => ({ ...prev, ...newImages }));
      }
    };
    fetchImages();
    // Only run when filteredItems or visibleItems changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredItems, visibleItems]);

  return (
    <div className="min-h-screen bg-muted/30">
      <MarketplaceHeader />
      <main className="container py-6 px-2 mx-auto">
        <MarketplaceOptions />
        <MarketplaceCategories />

        {/* View content */}
        <div className="space-y-6">
          <div className={viewMode === "grid" ? "block" : "hidden"}>
            {filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No items found</h3>
                <p className="text-muted-foreground mt-1 mb-4 max-w-md">
                  We couldn&apos;t find any items matching your search. Try
                  adjusting your filters or search terms.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredItems.slice(0, visibleItems).map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden group flex flex-col justify-between"
                  >
                    <div className="relative">
                      <Link
                        href={`/marketplace/${item.id}`}
                        className="cursor-pointer"
                      >
                        <Image
                          src={pixabayImages[item.id]}
                          alt={item.title}
                          width={400}
                          height={300}
                          className="h-48 w-full object-cover"
                        />
                        <Badge className="absolute bottom-2 left-2 bg-black/50 hover:bg-black/60 text-white">
                          ${item.price}/{item.priceUnit}
                        </Badge>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`absolute top-2 right-2 h-8 w-8 rounded-full ${
                          savedItems.includes(item.id)
                            ? "bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                            : "bg-black/20 text-white hover:bg-black/30"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaved(item.id);
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            savedItems.includes(item.id) ? "fill-current" : ""
                          }`}
                        />
                        <span className="sr-only">
                          {savedItems.includes(item.id)
                            ? "Remove from saved"
                            : "Save item"}
                        </span>
                      </Button>
                    </div>
                    <Link
                      href={`/marketplace/${item.id}`}
                      className="cursor-pointer"
                    >
                      <CardContent className="p-4">
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
                            <span className="ml-1 text-sm font-medium">
                              {item.rating}
                            </span>
                            <span className="ml-1 text-xs text-muted-foreground">
                              ({item.reviews})
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 py-0 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={item.owner.avatar || "/placeholder.svg"}
                              alt={item.owner.name}
                            />
                            <AvatarFallback>
                              {item.owner.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">
                            {item.owner.name}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 relative z-10"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            window.location.href = `/marketplace/${item.id}?rent=true`;
                          }}
                        >
                          Rent Now
                        </Button>
                      </CardFooter>
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <MarketplaceMap />
        </div>

        {visibleItems < filteredItems.length && (
          <div ref={loaderRef} className="flex justify-center py-8">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-teal-500"></div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Loading more items...
                </p>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setVisibleItems(
                      visibleItems + 8 > filteredItems.length
                        ? filteredItems.length
                        : visibleItems + 8
                    );
                    setIsLoading(false);
                  }, 800);
                }}
              >
                Load More
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
