// Api
import { getSearchMovies } from "@/services/api/movie/movie-search/index";

// Types
import { IgetSearchMovies } from "@/services/api/movie/movie-search/type";

export const getMovieSearchModdleware = async (
  params: IgetSearchMovies
): Promise<void> => {
  try {
    const data = await getSearchMovies(params);
    console.log("data", data);
    // const hasMovie = data?.results?.length;
    // const totalMovieFound = data?.total_results;
    // const totalPages = data?.total_pages;

    // if (totalMovieFound && hasMovie) {
    //   console.log("data", data);
    //   if (params?.onSuccess) {
    //     params.onSuccess({
    //       moviesSearch: data?.results,
    //       params,
    //     });
    //   }

    //   return;
    // }

    if (params?.onError) {
      params.onError(params);
    }
  } catch {
    if (params?.onError) {
      params.onError(params);
    }
  }
};
