export interface IgetSearchMovies {
  onSuccess?: (onSuccessParams?: IOnSuccessParams) => void;
  onError?: (params?: IgetSearchMovies) => void;
  page: number;
  query: string;
  genre: number | null;
}

interface IOnSuccessParams {
  moviesSearch: any[];
  params: IgetSearchMovies;
  total: number;
  totalPages: number;
}
