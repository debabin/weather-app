import type { AxiosRequestConfig } from 'axios';
import { weatherApi } from '../../../instance';

interface GetForecastParams {
  q: string;
  days?: number;
  aqi?: 'no' | 'yes';
  alerts?: 'no' | 'yes';
}

export const getForecast = (params: GetForecastParams, options?: AxiosRequestConfig) =>
  weatherApi.get<{ location: Weather.Location; current: Weather.Current }>('forecast.json', {
    ...options,
    params: { ...options?.params, ...params }
  });
