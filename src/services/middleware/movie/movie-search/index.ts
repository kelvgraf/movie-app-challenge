// Api
import { getSearchMovies } from "@/services/api/movie/movie-search/index";

// Types
import { IgetSearchMovies } from "@/services/api/movie/movie-search/type";

export const getMovieSearchModdleware = async (
  params: IgetSearchMovies
): Promise<void> => {
  try {
    const data = await getSearchMovies(params.query, params.page ?? 1);
    const totalMovieFound = data?.total_results;
    const totalPages = data?.total_pages;

    if (params?.onSuccess) {
      params.onSuccess({
        moviesSearch: data.results, // aqui os filmes
        total: totalMovieFound,
        totalPages: totalPages,
        params,
      });
      return;
    }

    // se não encontrou filmes
    if (params?.onError) {
      params.onError(params);
    }
  } catch {
    if (params?.onError) {
      params.onError(params);
    }
  }
};
