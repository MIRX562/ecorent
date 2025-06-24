import { Skeleton } from "@/components/ui/skeleton";

export default function MessagesLoading() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Search Skeleton */}
      <Skeleton className="h-10 w-full rounded-md" />

      {/* Conversations List Skeleton */}
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 rounded-lg border bg-card">
            <div className="flex items-start gap-4">
              <div className="relative">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <div className="flex items-center gap-2 mt-1">
                      <Skeleton className="w-5 h-5 rounded" />
                      <Skeleton className="h-3 w-40" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
