export interface IgetMovies {
  onSuccess?: (onSuccessParams?: IOnSuccessParams) => void;
  onError?: (params?: IgetMovies) => void;
}

interface IOnSuccessParams {
  genreMovies: any[];
  params: IgetMovies;
}
