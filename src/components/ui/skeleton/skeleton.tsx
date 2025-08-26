"use client";

function Skeleton({}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex justify-center items-center animate-pulse bg-neutral-900/10 dark:bg-neutral-100/10">
      <div className="relative w-52 h-80 rounded-xl overflow-hidden shadow-lg">
        <div className="w-full h-full bg-gray-800 animate-pulse" />

        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3">
          <div className="h-4 w-32 bg-gray-600 rounded animate-pulse" />
        </div>

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-20 h-20 rounded-full border-[6px] border-gray-700 animate-pulse" />
          </div>

          <div className="absolute bottom-0 w-full p-3 text-center space-y-2">
            <div className="h-4 w-28 bg-gray-600 rounded mx-auto animate-pulse" />
            <div className="h-3 w-20 bg-gray-500 rounded mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export { Skeleton };
