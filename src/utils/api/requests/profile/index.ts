import type { AxiosRequestConfig } from 'axios';
import { api } from '../../instance';

interface GetProfileParams {
  options?: AxiosRequestConfig;
}

export const getProfile = (params?: GetProfileParams) =>
  api.get<{ profile: Profile; success: true }>('profile', {
    ...params?.options
  });

interface PutProfileParams {
  data: {
    email: string;
    name?: string;
  };
  options?: AxiosRequestConfig;
}

export const putProfile = (params: PutProfileParams) =>
  api.put<{ profile: Profile; success: true }>('profile', params.data, {
    ...params?.options
  });
