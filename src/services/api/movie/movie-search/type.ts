export interface IgetSearchMovies {
  onSuccess?: (onSuccessParams?: IOnSuccessParams) => void;
  onError?: (params?: IgetSearchMovies) => void;
  page: number;
  query: string;
}

interface IOnSuccessParams {
  moviesSearch: any[];
  params: IgetSearchMovies;
  total: number;
  totalPages: number;
}
