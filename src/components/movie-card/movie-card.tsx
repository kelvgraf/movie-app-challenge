"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/utils";
import { RatingCircle } from "../rating-circle/rating-circle";
import { Typography } from "../typography/typography";

interface MovieCardProps {
  title: string;
  imageUrl: string;
  rating: number;
  genres: string[];
  id: number;
}

function MovieCard({ title, imageUrl, rating, genres, id }: MovieCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/movies/${id}`} className="flex justify-center items-center">
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
            "absolute inset-0 bg-black/60 transition-opacity duration-300",
            hovered ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <RatingCircle rating={Math.round(rating * 10)} />
          </div>

          <div className="absolute bottom-0 w-full p-3">
            <Typography
              text={title}
              variant="p"
              className="text-white font-semibold"
            />
            <Typography
              text={genres.join(", ")}
              variant="p"
              className="text-sm text-gray-300"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export { MovieCard };
