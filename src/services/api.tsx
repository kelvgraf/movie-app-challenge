import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    language: "pt-BR",
  },
});

export interface RequestProps {
  url: string;
  data?: object;
  headers?: object;
  params?: object;
  method: "get" | "post" | "put" | "delete" | "patch";
}

export async function request({
  method,
  headers,
  url,
  params,
  data,
}: RequestProps) {
  try {
    const response = await api({
      method,
      url,
      headers,
      data,
      params,
    });

    return { success: response.data };
  } catch (error) {
    return { error: error, success: false };
  }
}

export default request;
