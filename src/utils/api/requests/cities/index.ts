import type { AxiosRequestConfig } from 'axios';
import { api } from '../../instance';

interface GetCitiesParams {
  limit: number;
  offset: number;
}

export const getCities = (params: GetCitiesParams, options?: AxiosRequestConfig) =>
  api.get<string[]>('cities', {
    ...options,
    params: { ...options?.params, ...params }
  });

interface DeleteCityParams {
  id: string;
}

export const deleteCity = (params: DeleteCityParams, options?: AxiosRequestConfig) =>
  api.get<string[]>(`cities/${params.id}`, {
    ...options
  });

interface PostCityParams {
  data: { id: string };
  options?: AxiosRequestConfig;
}

export const postCity = (params: PostCityParams) =>
  api.post<string[]>(`cities/`, params.data, {
    ...params.options
  });
