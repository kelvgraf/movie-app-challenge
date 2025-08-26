"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; //Para pegar o ID do filme pela rota
import Image from "next/image";
import Link from "next/link";
import { request } from "@/services/api";

import { Typography } from "@/components/typography";
import { InfoMovieDetail } from "@/app/movies/components/movie-details";
import { Icons } from "@/components/icons/icons";
import { formatDateToBR, formatCurrentToBR } from "@/utils/utils";
import { RatingCircle } from "@/components/rating-circle/rating-circle";

type IMovieProps = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: IBelongsToCollectionProps;
  budget: number;
  genres: IGenreProps[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompanyProps[];
  production_countries: IProductionCountryProps[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguageProps[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type IBelongsToCollectionProps = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

type IGenreProps = {
  id: number;
  name: string;
};

type IProductionCompanyProps = {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
};

type IProductionCountryProps = {
  iso_3166_1: string;
  name: string;
};

type ISpokenLanguageProps = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

type IVideosProps = IVideosDetailsProps[];

type IVideosDetailsProps = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovieProps>();
  const [videos, setVideos] = useState<IVideosProps>([]);

  async function getMovieDetails(id: string) {
    const response = await request({
      url: `/movie/${id}`,
      method: "get",
      params: {
        language: "pt-BR",
      },
    });

    if (response.success) {
      setMovie(response?.success);
    }
  }

  async function getMovieVideos(id: string) {
    const response = await request({
      url: `/movie/${id}/videos`,
      method: "get",
      params: {
        language: "pt-BR",
      },
    });
    if (response.success) {
      setVideos(response.success.results);
    }
  }

  useEffect(() => {
    if (!id) return;
    getMovieDetails(id as string);
    getMovieVideos(id as string);
  }, [id]);

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Carregando...
      </div>
    );
  }

  const trailer = videos.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  return (
    <div className="min-h-screen w-full bg-mauve-dark-1 dark:bg-mauve-5 text-white">
      <div
        className="relative w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="h-full flex flex-col bg-mauve-dark-1/50">
          <Link href={`/`} className="flex items-center pt-4 pl-4">
            <Icons name={"ArrowLeftIcon"} />
            <Typography text={"Voltas"} />
          </Link>
          <div className="max-w-[1920px] mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10 ">
            <div>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={400}
                height={600}
                className="rounded-2xl shadow-lg"
              />
            </div>

            <div className="md:col-span-1 space-y-6 ">
              <span className="flex flex-col">
                <Typography
                  text={movie?.title}
                  variant="h2"
                  className={"text-[30px] font-semibold text-mauve-dark-12"}
                />
                <Typography
                  text={movie?.original_title}
                  variant="h3"
                  className={"text-[16px] font-normal text-mauve-dark-11"}
                />
              </span>
              <span className="grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 grid  md:hidden">
                <InfoMovieDetail
                  label={"Popularidade"}
                  infoDetail={movie.popularity}
                />
                <InfoMovieDetail
                  label={"Votos"}
                  infoDetail={movie.vote_count}
                />

                <div className="flex items-center">
                  <div className="relative w-20 h-20 rounded-full border-[6px] border-yellow-400 flex items-center justify-center">
                    <span className="text-lg font-bold text-yellow-400">
                      {Math.round(movie.vote_average * 10)}%
                    </span>
                  </div>
                </div>
              </span>
              <Typography
                text={movie?.tagline}
                variant="p"
                className={"text-[16px] font-normal italic text-mauve-dark-12"}
              />
              <span className="flex flex-col">
                <Typography
                  text={"Sinops"}
                  variant="h3"
                  className={"text-[16px] font-bold text-mauve-dark-11"}
                />
                <Typography text={movie?.overview} />
              </span>
              <div className="flex flex-col flex-wrap gap-3">
                <Typography text={"Generos"} variant="p" />
                <div className="flex gap-2 flex-wrap">
                  {movie.genres?.map((genre: IGenreProps) => (
                    <span
                      key={genre.id}
                      className="p-2 rounded-[2px] bg-purple-dark-alpha-3"
                    >
                      <Typography
                        text={genre.name}
                        variant="p"
                        className="text-purple-dark-11"
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full max-w-3xl grid gap-4">
              <span className="grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 hidden  md:grid">
                <InfoMovieDetail
                  label={"Popularidade"}
                  infoDetail={movie.popularity}
                />
                <InfoMovieDetail
                  label={"Votos"}
                  infoDetail={movie.vote_count}
                />
                <RatingCircle rating={Math.round(movie.vote_average * 10)} />
              </span>
              <span className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoMovieDetail
                  label={"Lançamento"}
                  infoDetail={formatDateToBR(movie.release_date)}
                />
                <InfoMovieDetail
                  label={"Duração"}
                  infoDetail={`${Math.floor(movie.runtime / 60)}h ${
                    movie.runtime % 60
                  }m`}
                />
                <InfoMovieDetail
                  label={"Situação"}
                  infoDetail={
                    movie.status === "Released" ? "Lançado" : movie.status
                  }
                />
                <InfoMovieDetail
                  label={"Idioma"}
                  infoDetail={movie.spoken_languages
                    .map((item) => item?.name)
                    .join(", ")}
                />
              </span>
              <span className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoMovieDetail
                  label={"Orçamento"}
                  infoDetail={formatCurrentToBR(movie.budget)}
                />
                <InfoMovieDetail
                  label={"Receita"}
                  infoDetail={formatCurrentToBR(movie.revenue)}
                />
                <InfoMovieDetail
                  label={"Lucro"}
                  infoDetail={formatCurrentToBR(movie.revenue - movie.budget)}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen h-screen p-16 flex flex-col justify-center items-center">
        <div className="max-w-[1920px] w-[100%] h-[100%]">
          <Typography
            text="Trailer"
            variant="p"
            className="font-bold text-2xl mb-4 text-mauve-1 dark:text-mauve-12"
          />
          {trailer ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <p>Trailer não disponível.</p>
          )}
        </div>
      </div>
    </div>
  );
}
