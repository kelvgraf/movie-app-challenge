// Api
import { getGenreMovieList } from "@/services/api/movie/genre-movie/index";

// Types
import { IgetMovies } from "@/services/api/movie/movie/types";

export const getGenreMovieMiddleware = async (
  params: IgetMovies
): Promise<void> => {
  try {
    const data = await getGenreMovieList();
    console.log("data", data);
    if (params?.onSuccess) {
      params.onSuccess({
        genreMovies: data,
        params,
      });
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
