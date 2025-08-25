// Api
import { getMovie } from "@/services/api/movie/movie/index";

// Types
import { IgetMovies } from "@/services/api/movie/movie/types";

export const getMovieMiddleware = async (params: IgetMovies): Promise<void> => {
  try {
    const data = await getMovie(params);
    const hasMovie = data?.results?.length;
    const totalMovieFound = data?.total_results;
    const totalPages = data?.total_pages;

    if (totalMovieFound && hasMovie) {
      if (params?.onSuccess) {
        params.onSuccess({
          movies: data?.results,
          total: totalMovieFound,
          totalPages: totalPages,
          params,
        });
      }

      return;
    }

    if (params?.onError) {
      params.onError(params);
    }
  } catch {
    if (params?.onError) {
      params.onError(params);
    }
  }
};
