"use client";

import { useEffect, useState } from "react";

import { request } from "@/services/api";
import useDebounce from "@/hooks/useDebounce";

import { Button } from "@/components/button";
import { Input } from "@/components/forms/input";
import { MovieCard } from "@/components/movie-card";
import { Pagination } from "@/components/pagination";

import { Skeleton } from "@/components/skeleton";
import { Typography } from "@/components/typography";

const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

type IMovieProps = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type Genre = {
  id: number;
  name: string;
};

type IGenreProps = Genre[];

export default function MovieList() {
  const [apiCache, setApiCache] = useState<Record<number, []>>({});
  const [apiPage, setApiPage] = useState(1);
  const [localPage, setLocalPage] = useState(1);
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState<IGenreProps>();
  const [loading, setLoading] = useState<boolean>(true);
  const [showGenres, setShowGenres] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const debouncedQuery = useDebounce(search, 600);

  async function getListMovie(page: number, genre?: number | null) {
    const response = await request({
      url: genre ? `/discover/movie` : `/movie/popular`,
      method: "get",
      params: {
        page,
        language: "pt-BR",
        ...(genre ? { with_genres: genre } : {}),
      },
    });

    if (response.success) {
      setApiCache((prev) => ({
        ...prev,
        [page]: response.success.results,
      }));
      if (!totalResults) {
        setTotalResults(response.success.total_results);
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);

    if (debouncedQuery.trim()) {
      getSearchMovies(debouncedQuery, apiPage, selectedGenre);
    } else if (selectedGenre) {
      getListMovie(apiPage, selectedGenre);
    } else {
      getListMovie(apiPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, selectedGenre, apiPage]);

  async function getGenreMovieList() {
    const response = await request({
      url: `/genre/movie/list`,
      method: "get",
      params: {
        language: "pt-BR",
      },
    });
    if (response.success) {
      setGenres(response.success.genres);
    }
  }

  useEffect(() => {
    if (!apiCache[apiPage]) {
      setLoading(true);
      getListMovie(apiPage);
    }

    if (!genres?.length) {
      getGenreMovieList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiPage, genres?.length, totalResults, search]);

  async function getSearchMovies(
    query: string,
    page: number,
    genre: number | null
  ) {
    const response = await request({
      url: `/search/movie`,
      method: "get",
      params: {
        page,
        language: "pt-BR",
        query,
      },
    });

    if (response.success) {
      let results = response.success.results;

      if (genre) {
        results = results.filter((movie: IMovieProps) =>
          movie.genre_ids.includes(genre)
        );
      }
      setApiCache((prev) => ({
        ...prev,
        [page]: results,
      }));
      setApiPage(page);
      setLocalPage(1);
      setTotalResults(results.length);
      setLoading(false);
    }
  }

  const movies20 = apiCache[apiPage] ?? [];
  const moviesToShow =
    localPage === 1 ? movies20.slice(0, 10) : movies20.slice(10, 20);

  const uiTotalPages = totalResults ? Math.ceil(totalResults / 10) : 0;
  const filteredMovies = moviesToShow;

  function handleCleanSearch() {
    if (!search) return;
    setSearch("");
    setApiCache({});
    setApiPage(1);
    setLocalPage(1);
    setTotalResults(null);

    if (selectedGenre) {
      getListMovie(1, selectedGenre);
    } else {
      getListMovie(1);
    }
  }

  const mapGenres = (genreIds: number[]) => {
    return genreIds
      .map((id) => genres?.find((g) => g.id === id)?.name)
      .filter(Boolean) as string[];
  };

  return (
    <>
      <div className="max-w-[1920px] w-full flex flex-col justify-between items-center gap-6">
        <div className="w-full md:w-[488px] flex justify-center items-center gap-2.5">
          <Input
            type="text"
            placeholder={"Pesquise por filmes"}
            iconRight={search ? "CloseIcon" : "SearchIcon"}
            className="w-full h-14 fill-mauve-dark-11 dark:fill-mauve-dark-2 bg-white"
            height={56}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClickIcon={handleCleanSearch}
          />
          <Button
            iconLeft="FilterIcon"
            className={`w-14 h-14 ${
              showGenres
                ? "bg-purple-dark-alpha-2 dark:bg--mauve-dark-2"
                : "bg-purple-dark-alpha-2/20 dark:bg-mauve-dark-2"
            }`}
            onClick={() => setShowGenres((prev) => !prev)}
          />
        </div>

        {showGenres && (
          <div className="flex flex-wrap gap-2 p-4 bg-mauve-dark-alpha-3 rounded-xs">
            {genres?.map((item: Genre) => (
              <Button
                key={item?.id}
                text={item?.name}
                onClick={() =>
                  setSelectedGenre(item.id === selectedGenre ? null : item.id)
                }
                className={`px-4 py-2 text-sm ${
                  selectedGenre === item.id
                    ? "bg-purple-600 text-white"
                    : "bg-purple-dark-alpha-2/20 text-gray-300 hover:bg-purple-dark-alpha-3/50"
                }`}
              ></Button>
            ))}
          </div>
        )}
        {loading ? (
          <div className="w-full p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
            {Array.from({ length: 10 }).map((_, index) => (
              <span key={index}>
                <Skeleton />
              </span>
            ))}
          </div>
        ) : (
          <div className="w-full p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 bg-mauve-dark-alpha-3 dark:bg-mauve-dark-alpha-12">
            {filteredMovies?.length > 0 &&
              filteredMovies.map((movie: IMovieProps) => {
                const movieGenres = mapGenres(movie.genre_ids);
                return (
                  <MovieCard
                    key={movie.id}
                    title={movie.title}
                    imageUrl={
                      movie.poster_path
                        ? `${POSTER_BASE}${movie.poster_path}`
                        : "/placeholder.png"
                    }
                    rating={movie.vote_average}
                    genres={movieGenres}
                    id={movie.id}
                  />
                );
              })}

            {!filteredMovies?.length && (
              <div>
                <Typography variant="h2" text={"Filme não encontrado"} />
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center gap-4">
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
    </>
  );
}
