import { api } from "@/services/api";

export const getSearchMovies = async (query: string, page: number = 1) => {
  try {
    const { data } = await api.get("/search/movie", {
      params: {
        query,
        page,
        language: "pt-BR",
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
