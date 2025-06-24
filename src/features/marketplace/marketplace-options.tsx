import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  ChevronDown,
  Filter,
  Grid,
  Map,
  MapPin,
  Sliders,
  Star,
} from "lucide-react";
import { useItemStore } from "./store/marketplace-store";

export default function MarketplaceOptions() {
  const {
    viewMode,
    setViewMode,
    getFilteredItems,
    priceRange,
    setPriceRange,
    maxDistance,
    setMaxDistance,
    ratings,
    sortBy,
    setSortBy,
  } = useItemStore();

  return (
    <div className="flex gap-4 items-center justify-between w-full pb-2">
      <div className="flex items-center gap-2 overflow-x-auto">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <Sliders className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] px-4">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Refine your search results</SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Price Range</h3>
                <div className="space-y-3">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100}
                    step={1}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">$0</span>
                    <span className="text-sm">$100+</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Distance</h3>
                <div className="space-y-3">
                  <Slider
                    value={[maxDistance]}
                    onValueChange={(v) => setMaxDistance(v[0])}
                    max={50}
                    step={1}
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Within 10 miles</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Availability</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Start Date
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    End Date
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox
                        checked={ratings.includes(rating)}
                        onCheckedChange={(checked) => {
                          const prev = useItemStore.getState().ratings;
                          useItemStore.setState({
                            ratings: checked
                              ? [...prev, rating]
                              : prev.filter((r) => r !== rating),
                          });
                        }}
                      />
                      <Label
                        htmlFor={`rating-${rating}`}
                        className="flex items-center"
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < rating
                                ? "fill-amber-500 text-amber-500"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-sm">& up</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Item Condition</h3>
                <div className="space-y-2">
                  {["Like New", "Excellent", "Good", "Fair"].map(
                    (condition) => (
                      <div
                        key={condition}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox id={`condition-${condition}`} />
                        <Label htmlFor={`condition-${condition}`}>
                          {condition}
                        </Label>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700">
                  Apply Filters
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        {/* <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>Portland, OR</span>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Sort By
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setSortBy("relevance")}
              className={sortBy === "relevance" ? "font-semibold bg-muted" : ""}
            >
              Relevance
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortBy("priceLow")}
              className={sortBy === "priceLow" ? "font-semibold bg-muted" : ""}
            >
              Price: Low to High
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortBy("priceHigh")}
              className={sortBy === "priceHigh" ? "font-semibold bg-muted" : ""}
            >
              Price: High to Low
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortBy("distance")}
              className={sortBy === "distance" ? "font-semibold bg-muted" : ""}
            >
              Distance: Nearest
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortBy("rating")}
              className={sortBy === "rating" ? "font-semibold bg-muted" : ""}
            >
              Rating: Highest
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-2">
        {/* <span className="text-sm text-muted-foreground">
          {getFilteredItems.length} results
        </span> */}
        <div className="border rounded-md">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("map")}
          >
            <Map className="h-4 w-4" />
            <span className="sr-only">Map view</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
