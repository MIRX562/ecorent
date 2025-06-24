import { Skeleton } from "@/components/ui/skeleton";

export default function ChatLoading() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
      {/* Header Skeleton */}
      <div className="p-4 border-b bg-card">
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-4 md:hidden" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
      </div>

      {/* Item Context Skeleton */}
      <div className="p-4 bg-teal-50 dark:bg-teal-950/20 border-b">
        <div className="p-4 border rounded-lg bg-card">
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-lg" />
            <div className="flex-1">
              <Skeleton className="h-4 w-48 mb-2" />
              <div className="flex items-center gap-4 mt-1">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
              <Skeleton className="h-3 w-32 mt-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Messages Skeleton */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Received message */}
        <div className="flex justify-start">
          <div className="max-w-xs">
            <Skeleton className="h-16 w-64 rounded-lg" />
          </div>
        </div>

        {/* Sent message */}
        <div className="flex justify-end">
          <div className="max-w-xs">
            <Skeleton className="h-12 w-48 rounded-lg" />
          </div>
        </div>

        {/* Received message */}
        <div className="flex justify-start">
          <div className="max-w-xs">
            <Skeleton className="h-20 w-72 rounded-lg" />
          </div>
        </div>

        {/* Sent message */}
        <div className="flex justify-end">
          <div className="max-w-xs">
            <Skeleton className="h-14 w-56 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Input Skeleton */}
      <div className="p-4 border-t bg-card">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>
    </div>
  );
}
