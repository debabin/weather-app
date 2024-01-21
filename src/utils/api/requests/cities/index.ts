import type { AxiosRequestConfig } from 'axios';
import { api } from '../../instance';

interface GetCitiesParams {
  data: { limit: number; offset: number };
  options?: AxiosRequestConfig;
}

export const getCities = (params: GetCitiesParams) =>
  api.get<{
    next: boolean;
    prev: boolean;
    total: number;
    data: string[];
  }>('cities', {
    ...params.options,
    params: { ...params.options?.params, ...params.data }
  });

interface DeleteCityParams {
  data: { id: string };
  options?: AxiosRequestConfig;
}

export const deleteCity = (params: DeleteCityParams) =>
  api.get<string[]>(`cities/${params.data.id}`, params.options);

interface PostCityParams {
  data: { id: string };
  options?: AxiosRequestConfig;
}

export const postCity = (params: PostCityParams) =>
  api.post<string[]>(`cities/`, params.data, params.options);
