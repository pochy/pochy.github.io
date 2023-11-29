import { Skeleton } from "@/components/ui/skeleton";
import { Folder } from "lucide-react";

export default function Loading() {
  return (
    <main className="container mt-10 pb-10 mx-auto px-4 max-w-4xl">
      <div className="grid grid-cols-1 gap-x-8 gap-y-16">
        <SkeletonCard />
      </div>
    </main>
  );
}

export function SkeletonCard() {
  return (
    <article className="bg-white p-4 rounded-lg">
      <div className="flex items-center gap-x-4 mb-2">
        <time className="text-gray-500">
          <Skeleton className="h-4 w-[250px]" />
        </time>
        <div>
          <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
            <Folder className="inline h-4 w-4" />
            <Skeleton className="h-4 w-[250px]" />
          </span>
        </div>
      </div>
      <div className="mb-4">
        <span className="relative z-10 text-xs rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
          <Skeleton className="h-4 w-[250px]" />
        </span>
      </div>
      <div className="group relative">
        <Skeleton className="h-[400px] w-[100%]" />
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <Skeleton className="h-4 w-[250px]" />
        </h3>

        <div className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </div>
    </article>
  );
}
