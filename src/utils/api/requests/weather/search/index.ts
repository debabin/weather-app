import type { AxiosRequestConfig } from 'axios';
import { weatherApi } from '../../../instance';

interface SearchParams {
  q: string;
}

export const getSearch = (params: SearchParams, options?: AxiosRequestConfig) =>
  weatherApi.get<City[]>(`search.json?q=${params.q}`, {
    ...options
  });
