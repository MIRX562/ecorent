import GoogleMapReact from "google-map-react";
import { useEffect, useState, MouseEvent, useRef } from "react";
import { MapPin, User } from "lucide-react";
import { useItemStore } from "./store/marketplace-store";
import { items } from "./dummy";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const DEFAULT_CENTER = { lat: -0.947083, lng: 100.417181 }; // Padang, Indonesia
const DEFAULT_ZOOM = 12;

type ItemType = (typeof items)[number];

function ItemMarker({
  item,
  lat,
  lng,
  pixabayImage,
}: {
  item: ItemType;
  lat: number;
  lng: number;
  pixabayImage?: string;
}) {
  const [showCard, setShowCard] = useState(false);
  const markerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Show card on hover (desktop) or tap (mobile)
  const handleMouseEnter = () => setShowCard(true);
  const handleMouseLeave = (e: React.MouseEvent) => {
    if (cardRef.current && cardRef.current.contains(e.relatedTarget as Node)) {
      return;
    }
    setShowCard(false);
  };
  const handleCardMouseLeave = (e: React.MouseEvent) => {
    if (
      markerRef.current &&
      markerRef.current.contains(e.relatedTarget as Node)
    ) {
      return;
    }
    setShowCard(false);
  };
  const handleClick = () => setShowCard((v) => !v);

  // Close card if user taps outside (mobile UX)
  useEffect(() => {
    if (!showCard) return;
    const handleDocClick = (e: Event) => {
      if (
        markerRef.current?.contains(e.target as Node) ||
        cardRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      setShowCard(false);
    };
    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, [showCard]);

  return (
    <div
      ref={markerRef}
      style={{
        position: "absolute",
        transform: "translate(-50%, -100%)",
        zIndex: showCard ? 10 : 1,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={`Show details for ${item.title}`}
    >
      <MapPin className="h-6 w-6 text-teal-500 drop-shadow cursor-pointer" />
      {showCard && (
        <div
          ref={cardRef}
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full w-64"
          onMouseLeave={handleCardMouseLeave}
          onMouseEnter={handleMouseEnter}
        >
          <Card className="overflow-hidden group flex flex-col justify-between shadow-lg border border-teal-200">
            <div className="relative">
              <Link href={`/marketplace/${item.id}`} className="cursor-pointer">
                <Image
                  src={pixabayImage || item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="h-32 w-full object-cover"
                />
                <Badge className="absolute bottom-2 left-2 bg-black/50 hover:bg-black/60 text-white">
                  ${item.price}/{item.priceUnit}
                </Badge>
              </Link>
            </div>
            <CardContent className="p-2">
              <div className="space-y-1">
                <h3 className="font-medium truncate">{item.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center text-xs">
                  <span className="text-muted-foreground">{item.location}</span>
                </div>
                <div className="flex items-center">
                  <span className="ml-1 text-xs font-medium">
                    {item.rating}
                  </span>
                  <span className="ml-1 text-xs text-muted-foreground">
                    ({item.reviews})
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-2 py-0 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={item.owner.avatar || "/placeholder.svg"}
                    alt={item.owner.name}
                  />
                  <AvatarFallback>{item.owner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">
                  {item.owner.name}
                </span>
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 relative z-10"
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  e.preventDefault();
                  window.location.href = `/marketplace/${item.id}?rent=true`;
                }}
              >
                Rent Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}

function UserMarker({
  lat,
  lng,
  $hover,
}: {
  lat: number;
  lng: number;
  $hover?: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        transform: "translate(-50%, -100%)",
        zIndex: $hover ? 10 : 1,
      }}
    >
      <User className="h-7 w-7 text-cyan-600 drop-shadow bg-white rounded-full border-2 border-cyan-400" />
      {$hover && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full w-40">
          <div className="bg-white rounded shadow p-2 text-xs text-center border border-cyan-300">
            You are here
          </div>
        </div>
      )}
    </div>
  );
}

const PIXABAY_API_KEY = "50978905-d1ce30881d322635459928df1";

export default function MarketplaceMap() {
  const { viewMode } = useItemStore();
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [pixabayImages, setPixabayImages] = useState<Record<number, string>>(
    {}
  );

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
    // Fetch images for all items if not already cached
    const fetchImages = async () => {
      const promises = items.map(async (item) => {
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
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={viewMode === "map" ? "block" : "hidden"}>
      <div className="relative h-[600px] w-full rounded-lg border overflow-hidden">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.GOOGLE_MAPS_API_KEY,
            libraries: ["places"],
          }}
          defaultCenter={DEFAULT_CENTER}
          center={center}
          defaultZoom={DEFAULT_ZOOM}
          yesIWantToUseGoogleMapApiInternals
        >
          {items.map((item) =>
            item.lat && item.lng ? (
              <ItemMarker
                key={item.id}
                lat={item.lat}
                lng={item.lng}
                item={item}
                pixabayImage={pixabayImages[item.id]}
              />
            ) : null
          )}
          {userLocation && (
            <UserMarker lat={userLocation.lat} lng={userLocation.lng} />
          )}
        </GoogleMapReact>
      </div>
    </div>
  );
}
