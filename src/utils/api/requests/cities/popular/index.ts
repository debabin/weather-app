import type { AxiosRequestConfig } from 'axios';
import { api } from '../../../instance';

interface GetCitiesPopularParams {
  options?: AxiosRequestConfig;
}

export const getCitiesPopular = (params?: GetCitiesPopularParams) =>
  api.get<string[]>('cities/popular', params?.options);
