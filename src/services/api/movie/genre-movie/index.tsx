import { api } from "@/services/api";

export const getGenreMovie = async () => {
  try {
    const { data } = await api.get(`/genre/movie/list`, {
      params: {
        language: "pt-BR",
      },
    });
    if (data?.genres) {
      return data;
    }
    throw Error();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    throw Error();
  }
};
