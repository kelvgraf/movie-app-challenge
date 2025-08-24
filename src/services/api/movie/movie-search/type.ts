export interface IgetSearchMovies {
  onSuccess?: (onSuccessParams?: IOnSuccessParams) => void;
  onError?: (params?: IgetSearchMovies) => void;
  page: number;
}

export enum IPatientType {
  interned,
}

interface IOnSuccessParams {
  moviesSearch: any[];
  params: IgetSearchMovies;
}
