"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/utils";

interface MovieCardProps {
  title: string;
  imageUrl: string;
  rating: number;
  genres: string[];
}

function MovieCard({ title, imageUrl, rating, genres }: MovieCardProps) {
  const [hovered, setHovered] = useState(false);
  console.log("genres in movieCard", genres);
  return (
    <div
      className="relative w-52 h-80 rounded-xl overflow-hidden shadow-lg cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3">
        <p
          className={cn(
            "text-white font-semibold transition-opacity duration-300",
            hovered && "opacity-0"
          )}
        >
          {title}
        </p>
      </div>

      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity duration-300",
          hovered ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="relative w-20 h-20 rounded-full border-[6px] border-yellow-400 flex items-center justify-center">
          <span className="text-lg font-bold text-yellow-400">{rating}%</span>
          <p>{genres}</p>
        </div>
      </div>
    </div>
  );
}
export { MovieCard };
