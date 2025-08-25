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
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState<{ genreMovie?: { genres?: any[] } }>();
  const [showGenres, setShowGenres] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const debouncedQuery = useDebounce(search, 600);

  useEffect(() => {
    console.log("!apiCache[apiPage]", apiCache, apiPage);
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
        onSuccess: (params) => {
          setGenres(params);
        },
        onError: () => console.log("Erro ao buscar gêneros"),
      });
    }
  }, [
    apiCache,
    apiPage,
    genres?.genreMovie?.genres?.length,
    totalResults,
    search,
  ]);

  useEffect(() => {
    if (!debouncedQuery.trim() && !selectedGenre) return;

    getMovieSearchModdleware({
      query: debouncedQuery,
      page: 1,
      genre: selectedGenre,
      onSuccess: (response: any) => {
        setApiCache((prev) => ({
          ...prev,
          [1]: response.moviesSearch,
        }));
        setApiPage(1);
        setLocalPage(1);
        setTotalResults(response.totalPages);
      },
      onError: () => {
        console.log("Erro ao buscar filmes");
      },
      // search: [],
      total: 0,
      totalPages: 0,
    });
  }, [debouncedQuery, selectedGenre]);

  const movies20 = apiCache[apiPage] ?? [];
  const moviesToShow =
    localPage === 1 ? movies20.slice(0, 10) : movies20.slice(10, 20);

  const uiTotalPages = totalResults ? Math.ceil(totalResults / 10) : 0;
  const filteredMovies = moviesToShow;

  function handleCleanSrach() {
    if (!search) return;
    setSearch("");
    getMovieMiddleware({
      page: 1,
      onSuccess: (response: any) => {
        setApiCache({ 1: response.movies });
        setApiPage(1);
        setLocalPage(1);
        setTotalResults(response.totalPages);
      },
      onError: () => {
        console.log("Erro ao carregar filmes padrão");
      },
    });
  }
  const mapGenres = (genreIds: number[]) => {
    return genreIds
      .map((id) => genres?.genreMovies?.find((g) => g.id === id)?.name)
      .filter(Boolean) as string[];
  };
  return (
    <div
      className="h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/imagens/backgropund-krists-luhaers-unsplash.png')",
      }}
    >
      <Header className="bg-[color:var(--mauve-dark-1)]/80" />
      <main className="w-full mx-auto p-4 flex justify-center bg-[color:var(--mauve-dark-1)]/80">
        <div className="max-w-[1920px] w-full flex flex-col justify-between items-center gap-6">
          <div className="w-[488px] flex justify-center items-center gap-2.5">
            <Input
              type="text"
              placeholder={"Pesquise por filmes"}
              iconRight={search ? "CloseIcon" : "SearchIcon"}
              className="w-full h-14 fill-[color:var(--mauve-dark-11)]"
              height={56}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClickIcon={handleCleanSrach}
            />
            <Button
              iconLeft="FilterIcon"
              className={`w-14 h-14 ${
                showGenres
                  ? "bg-purple-600 text-white" // cor quando ativo
                  : "bg-[color:var(--purple-dark-alpha-2)]/20"
              }`}
              onClick={() => setShowGenres((prev) => !prev)}
            />
          </div>

          {showGenres && (
            <div className="flex flex-wrap gap-2 p-4 bg-[color:var(--mauve-dark-alpha-3)] rounded-xs">
              {console.log("genres", genres)}
              {genres?.genreMovies?.map((item: any) => (
                <Button
                  key={item.id}
                  text={item.name}
                  onClick={() =>
                    setSelectedGenre(item.id === selectedGenre ? null : item.id)
                  }
                  className={`px-4 py-2 text-sm ${
                    selectedGenre === item.id
                      ? "bg-purple-600 text-white"
                      : "bg-[color:var(--purple-dark-alpha-2)]/20 text-gray-300 hover:bg-[color:var(--purple-dark-alpha-3)]/50"
                  }`}
                ></Button>
              ))}
            </div>
          )}

          <div className="w-full p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 bg-[color:var(--mauve-dark-alpha-3)]">
            {filteredMovies.map((movie: any) => {
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
                  rating={Math.round(movie.vote_average * 10)}
                  genres={movieGenres}
                  id={movie.id}
                />
              );
            })}
          </div>

          {/* Paginação */}
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
