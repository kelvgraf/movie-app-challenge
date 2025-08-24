import { api } from "@/services/api";
import { IgetMovies } from "./types";

export const getMovie = async (params: IgetMovies) => {
  const { page } = params;
  try {
    const { data } = await api.get(`/movie/popular`, {
      params: {
        page: `${page}`,
      },
    });

    if (data?.results) {
      return data;
    }
    throw Error();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    throw Error();
  }
};
