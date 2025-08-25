import { api } from "@/services/api";

export const getGenreMovieList = async (language = "pt-BR") => {
  const { data } = await api.get("/genre/movie/list", {
    params: { language },
  });
  return data.genres;
};
