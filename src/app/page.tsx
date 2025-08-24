"use client";

import { useEffect, useState } from "react";
import { getMovieMiddleware } from "@/services/middleware/movie/movie/index";
import { getMovieSearchModdleware } from "@/services/middleware/movie/movie-search/index";
import { getGenreMovieMiddleware } from "@/services/middleware/movie/genre-movie/index";

import { Header } from "@/app/components/header/header";
import { Button } from "@/components/button";
import { Input } from "@/components/forms/input";
import { MovieCard } from "@/components/movieCard";
import { Pagination } from "@/components/pagination";
import useDebounce from "@/hooks/useDebounce";

const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

export default function HomePage() {
  const [apiCache, setApiCache] = useState<Record<number, any[]>>({});
  const [apiPage, setApiPage] = useState(1);
  const [localPage, setLocalPage] = useState(1);
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const [movieSearch, setMovieSearch] = useState("");

  const [genres, setGenres] = useState<{ genreMovie?: { genres?: any[] } }>();
  console.log("genres", genres);
  const debouncedQuery = useDebounce(movieSearch, 600);

  // busca filmes + gêneros
  useEffect(() => {
    if (!apiCache[apiPage]) {
      getMovieMiddleware({
        page: apiPage,
        onSuccess: (response: any) => {
          setApiCache((prev) => ({
            ...prev,
            [apiPage]: response.movies,
          }));
          if (!totalResults) {
            setTotalResults(response.totalPages);
          }
        },
        onError: () => {},
      });
    }

    if (!genres?.genreMovie?.genres?.length) {
      getGenreMovieMiddleware({
        onSuccess: (response: any) => {
          setGenres(response);
        },
        onError: () => {},
      });
    }
  }, [apiCache, apiPage, genres?.genreMovie?.genres?.length, totalResults]);

  useEffect(() => {
    (async () => {
      if (!debouncedQuery.trim()) {
        await getMovieSearchModdleware({
          onSuccess: (response: any) => {
            setApiCache((prev) => ({
              ...prev,
              [apiPage]: response.movies,
            }));
            if (!totalResults) {
              setTotalResults(response.totalPages);
            }
          },
          onError: () => {},
          page: 0,
        });
        return;
      }
    })();
  }, [apiPage, debouncedQuery, localPage, totalResults]);

  const movies20 = apiCache[apiPage] ?? [];
  const isFirstHalf = localPage === 1;
  const moviesToShow = isFirstHalf
    ? movies20.slice(0, 10)
    : movies20.slice(10, 20);

  const uiTotalPages = totalResults ? Math.ceil(totalResults / 10) : 0;

  return (
    <div>
      <Header />
      <main className="w-full mx-auto p-4 flex justify-center">
        <div className="max-w-[1920px] w-full mx-auto flex flex-col justify-between items-center gap-6">
          <div className="w-[488px] flex justify-center align-center gap-2.5">
            <Input
              placeholder={"Pesquise por filmes"}
              iconRight={movieSearch ? "CloseIcon" : "SearchIcon"}
              className="w-full h-14 fill-[color:var(--mauve-dark-11)]"
              height={56}
              value={movieSearch}
              onChange={(e) => setMovieSearch(e.target.value)}
              onClickIcon={() => setMovieSearch("")}
            />
            <Button
              iconLeft="FilterIcon"
              className="w-14 h-14 bg-[color:var(--purple-dark-alpha-2)]/20"
            />
          </div>

          <div className="w-full p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 bg-[color:var(--mauve-dark-alpha-3)]">
            {moviesToShow.map((movie: any) => {
              const movieGenres = movie?.genre_ids
                ?.map(
                  (id: number) =>
                    genres?.genreMovie?.genres?.find(
                      (item: any) => item.id === id
                    )?.name
                )
                .filter(Boolean);
              console.log("moviemoviemovie", movieGenres);
              return (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  imageUrl={
                    movie.poster_path
                      ? `${POSTER_BASE}${movie.poster_path}`
                      : "/placeholder.png"
                  }
                  rating={Math.round(movie.vote_average * 10)}
                  genres={movieGenres}
                />
              );
            })}
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <Pagination
              currentPage={(apiPage - 1) * 2 + localPage}
              totalPages={uiTotalPages}
              onPageChange={(page) => {
                const newApiPage = Math.ceil(page / 2);
                const newLocalPage = page % 2 === 0 ? 2 : 1;
                setApiPage(newApiPage);
                setLocalPage(newLocalPage);
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
