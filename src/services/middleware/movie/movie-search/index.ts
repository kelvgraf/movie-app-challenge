// Api
import { getSearchMovies } from "@/services/api/movie/movie-search/index";

// Types
import { IgetSearchMovies } from "@/services/api/movie/movie-search/type";

export const getMovieSearchModdleware = async (
  params: IgetSearchMovies
): Promise<void> => {
  try {
    const data = await getSearchMovies(params.query, params.page, params.genre);
    console.log("data", data);
    if (params?.onSuccess) {
      params.onSuccess({
        moviesSearch: data?.results,
        totalPages: data?.total_pages,
        total: 0,
        params,
      });
    }
  } catch {
    if (params?.onError) params.onError(params);
  }
};
