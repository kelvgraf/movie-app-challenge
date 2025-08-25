import { api } from "@/services/api";

export const getSearchMovies = async (
  query: string,
  page = 1,
  genre?: number
) => {
  const { data } = await api.get("/search/movie", {
    params: {
      query,
      page,
      language: "pt-BR",
      with_genres: genre,
    },
  });
  return data;
};
