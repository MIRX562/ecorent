import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { useItemStore } from "./store/marketplace-store";
import { categories } from "./dummy";

export default function MarketplaceCategories() {
  const { activeCategory, setActiveCategory } = useItemStore();
  return (
    <div className="overflow-x-auto pb-1 mb-2">
      <Tabs
        defaultValue="all"
        value={activeCategory}
        onValueChange={setActiveCategory}
      >
        <TabsList className="h-auto p-1 bg-transparent">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="px-3 py-1.5 text-sm data-[state=active]:bg-teal-50 data-[state=active]:text-teal-600 dark:data-[state=active]:bg-teal-950/50 dark:data-[state=active]:text-teal-400"
            >
              <span className="mr-1">{category.icon}</span> {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
