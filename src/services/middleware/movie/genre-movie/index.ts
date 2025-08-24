// Api
import { getGenreMovie } from "@/services/api/movie/genre-movie/index";

// Types
import { IgetMovies } from "@/services/api/movie/movie/types";

export const getGenreMovieMiddleware = async (
  params: IgetMovies
): Promise<void> => {
  try {
    const data = await getGenreMovie();

    if (params?.onSuccess) {
      params.onSuccess({
        genreMovies: data,
        params,
      });
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
