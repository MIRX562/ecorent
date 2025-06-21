import { create } from "zustand";
import { ItemType } from "../types/marketplace-item-type";

type ViewMode = "grid" | "map";

interface ItemStore {
  searchQuery: string;
  setSearchQuery: (v: string) => void;

  activeCategory: string;
  setActiveCategory: (v: string) => void;

  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;

  savedItems: number[];
  setSavedItems: (ids: number[]) => void;
  toggleSaved: (id: number) => void;

  visibleItems: number;
  setVisibleItems: (v: number) => void;

  isLoading: boolean;
  setIsLoading: (v: boolean) => void;

  getFilteredItems: (allItems: ItemType[]) => ItemType[];

  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;

  maxDistance: number;
  setMaxDistance: (v: number) => void;

  ratings: number[];
  setRatings: (v: number[]) => void;

  conditions: string[];
  setConditions: (v: string[]) => void;
}

export const useItemStore = create<ItemStore>((set, get) => ({
  searchQuery: "",
  setSearchQuery: (v) => set({ searchQuery: v }),

  activeCategory: "all",
  setActiveCategory: (v) => set({ activeCategory: v }),

  viewMode: "grid",
  setViewMode: (v) => set({ viewMode: v }),

  savedItems: [],
  setSavedItems: (ids) => set({ savedItems: ids }),
  toggleSaved: (id) => {
    const current = get().savedItems;
    if (current.includes(id)) {
      set({ savedItems: current.filter((i) => i !== id) });
    } else {
      set({ savedItems: [...current, id] });
    }
  },

  visibleItems: 8,
  setVisibleItems: (v) => set({ visibleItems: v }),

  isLoading: false,
  setIsLoading: (v) => set({ isLoading: v }),
  getFilteredItems: (allItems: ItemType[]) => {
    const {
      searchQuery,
      activeCategory,
      priceRange,
      maxDistance,
      ratings,
      // conditions,
    } = get();

    return allItems.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        activeCategory === "all" || item.category === activeCategory;

      const matchPrice =
        item.price >= priceRange[0] && item.price <= priceRange[1];

      const matchDistance = item.distance <= maxDistance;

      const matchRating =
        ratings.length === 0 || ratings.some((r) => item.rating >= r);

      // const matchCondition =
      //   conditions.length === 0 || conditions.includes(item.condition); // assumes item.condition exists

      return (
        matchSearch &&
        matchCategory &&
        matchPrice &&
        matchDistance &&
        matchRating
        // matchCondition
      );
    });
  },

  priceRange: [0, 100],
  setPriceRange: (v) => set({ priceRange: v }),

  maxDistance: 50,
  setMaxDistance: (v) => set({ maxDistance: v }),

  ratings: [],
  setRatings: (v) => set({ ratings: v }),

  conditions: [],
  setConditions: (v) => set({ conditions: v }),
}));
