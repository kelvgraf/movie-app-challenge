export interface IgetMovies {
  onSuccess?: (onSuccessParams?: IOnSuccessParams) => void;
  onError?: (params?: IgetMovies) => void;
  page: number;
}

interface IOnSuccessParams {
  genreMovies: any[];
  params: IgetMovies;
}
