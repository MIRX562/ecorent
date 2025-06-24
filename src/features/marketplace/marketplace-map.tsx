import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import { MapPin, User, MapPin as Star } from "lucide-react";
import { useItemStore } from "./store/marketplace-store";
import { items } from "./dummy";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ItemType } from "./types/marketplace-item-type";

const DEFAULT_CENTER = { lat: -0.947083, lng: 100.417181 }; // Padang, Indonesia
const DEFAULT_ZOOM = 12;

function ItemMarker({
  item,
  onSelect,
}: {
  item: ItemType;
  onSelect: (item: ItemType) => void;
}) {
  const [hovered, setHovered] = useState(false);
  // Keep hover card open if mouse is over marker or card
  const [cardHovered, setCardHovered] = useState(false);

  return (
    <div
      style={{
        position: "absolute",
        transform: "translate(-50%, -100%)",
        zIndex: 10,
      }}
      onClick={() => onSelect(item)}
      tabIndex={0}
      role="button"
      aria-label={`Show details for ${item.title}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <MapPin className="h-6 w-6 text-teal-500 drop-shadow cursor-pointer" />
      {(hovered || cardHovered) && (
        <div
          className="absolute left-1/2 top-0 z-50 -translate-x-1/2 -translate-y-full"
          onMouseEnter={() => setCardHovered(true)}
          onMouseLeave={() => setCardHovered(false)}
        >
          <Card className="w-64 p-3 shadow-lg border border-gray-200 bg-white">
            <div className="flex gap-3 items-center">
              <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-base line-clamp-1">
                  {item.title}
                </div>
                <div className="text-xs text-muted-foreground line-clamp-1">
                  {item.location}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span className="text-xs font-medium">{item.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({item.reviews})
                  </span>
                </div>
                <Badge className="text-xs bg-gradient-to-r from-teal-500 to-cyan-600 mt-1">
                  ${item.price}/{item.priceUnit}
                </Badge>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
              {item.description}
            </p>
            <Button
              className="w-full mt-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
              asChild
              size="sm"
            >
              <Link href={`/marketplace/${item.id}`}>View Details</Link>
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}

function UserMarker({ lat, lng }: { lat: number; lng: number }) {
  return (
    <div
      style={{
        position: "absolute",
        transform: "translate(-50%, -100%)",
        zIndex: 10,
      }}
    >
      <User className="h-7 w-7 text-cyan-600 drop-shadow bg-white rounded-full border-2 border-cyan-400" />
    </div>
  );
}

const PIXABAY_API_KEY = "50978905-d1ce30881d322635459928df1";

export default function MarketplaceMap() {
  const { viewMode, getFilteredItems } = useItemStore();
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [pixabayImages, setPixabayImages] = useState<Record<number, string>>(
    {}
  );
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [hoveredItem, setHoveredItem] = useState<ItemType | null>(null);
  const [hoverCardPos, setHoverCardPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const filteredItems = getFilteredItems(items);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setCenter(loc);
          setUserLocation(loc);
        },
        () => {},
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, []);

  useEffect(() => {
    // Fetch images for all filtered items if not already cached
    const fetchImages = async () => {
      const promises = filteredItems.map(async (item) => {
        if (!pixabayImages[item.id]) {
          try {
            const res = await fetch(
              `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
                item.title
              )}&image_type=photo`
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
    // Only run when filteredItems changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredItems]);

  // Helper to detect desktop
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

  // Handle hover card close
  useEffect(() => {
    if (!hoveredItem && !isHoveringCard) {
      setHoverCardPos(null);
    }
  }, [hoveredItem, isHoveringCard]);

  // Render hover card
  const renderHoverCard = () => {
    if (!hoveredItem || !hoverCardPos || !isDesktop) return null;
    return (
      <div
        className="fixed z-50"
        style={{ left: hoverCardPos.x + 16, top: hoverCardPos.y - 80 }}
        onMouseEnter={() => setIsHoveringCard(true)}
        onMouseLeave={() => {
          setIsHoveringCard(false);
          setHoveredItem(null);
        }}
      >
        <Card className="w-80 shadow-lg border border-gray-200">
          <div className="relative aspect-video rounded-t-lg overflow-hidden">
            <Image
              src={pixabayImages[hoveredItem.id] || hoveredItem.image}
              alt={hoveredItem.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-3">
            <h3 className="font-semibold text-lg mb-1">{hoveredItem.title}</h3>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {hoveredItem.location}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span className="text-xs font-medium">{hoveredItem.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({hoveredItem.reviews})
              </span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
              {hoveredItem.description}
            </p>
            <Badge className="text-xs bg-gradient-to-r from-teal-500 to-cyan-600">
              ${hoveredItem.price}/{hoveredItem.priceUnit}
            </Badge>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className={viewMode === "map" ? "block" : "hidden"}>
      <Sheet
        open={!!selectedItem}
        onOpenChange={(open) => !open && setSelectedItem(null)}
      >
        <SheetContent
          side="bottom"
          className="max-h-[90vh] overflow-y-auto p-0 rounded-t-2xl"
        >
          {selectedItem && (
            <div className="p-4">
              <Card className="shadow-none border-none">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative aspect-video md:aspect-square w-full md:w-64 rounded-lg overflow-hidden mb-4 md:mb-0 flex-shrink-0">
                    <Image
                      src={pixabayImages[selectedItem.id] || selectedItem.image}
                      alt={selectedItem.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold">
                          {selectedItem.title}
                        </h2>
                        <Badge className="text-base bg-gradient-to-r from-teal-500 to-cyan-600">
                          ${selectedItem.price}/{selectedItem.priceUnit}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {selectedItem.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                        <span className="text-sm font-medium">
                          {selectedItem.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({selectedItem.reviews})
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {selectedItem.description}
                      </p>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 mt-2 md:mt-0"
                      asChild
                    >
                      <Link href={`/marketplace/${selectedItem.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </SheetContent>
        <div className="relative h-[600px] w-full rounded-lg border overflow-hidden">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.GOOGLE_MAPS_API_KEY || "",
              libraries: ["places"],
            }}
            defaultCenter={DEFAULT_CENTER}
            center={center}
            defaultZoom={DEFAULT_ZOOM}
            yesIWantToUseGoogleMapApiInternals
          >
            {filteredItems.map((item) =>
              item.lat && item.lng ? (
                <div
                  key={item.id}
                  lat={item.lat}
                  lng={item.lng}
                  onMouseEnter={
                    isDesktop
                      ? (e) => {
                          setHoveredItem(item);
                          setHoverCardPos({ x: e.clientX, y: e.clientY });
                        }
                      : undefined
                  }
                  onMouseMove={
                    isDesktop
                      ? (e) => {
                          setHoverCardPos({ x: e.clientX, y: e.clientY });
                        }
                      : undefined
                  }
                  onMouseLeave={
                    isDesktop
                      ? () => {
                          setHoveredItem(null);
                        }
                      : undefined
                  }
                  onClick={() => setSelectedItem(item)}
                  style={{
                    position: "absolute",
                    transform: "translate(-50%, -100%)",
                    zIndex: 10,
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Show details for ${item.title}`}
                >
                  <MapPin className="h-6 w-6 text-teal-500 drop-shadow cursor-pointer" />
                </div>
              ) : null
            )}
            {userLocation && (
              <UserMarker lat={userLocation.lat} lng={userLocation.lng} />
            )}
          </GoogleMapReact>
          {renderHoverCard()}
        </div>
      </Sheet>
    </div>
  );
}
