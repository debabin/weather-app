import type { AxiosRequestConfig } from 'axios';
import { weatherApi } from '../../../instance';

interface GetSearchParams {
  q: string;
}

export const getSearch = (params: GetSearchParams, options?: AxiosRequestConfig) =>
  weatherApi.get<City[]>(`search.json`, {
    ...options,
    params: { ...options?.params, ...params }
  });
