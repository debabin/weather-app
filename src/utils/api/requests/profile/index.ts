import type { AxiosRequestConfig } from 'axios';
import { api } from '../../instance';

interface GetProfileParams {
  options?: AxiosRequestConfig;
}

export const getProfile = (params?: GetProfileParams) =>
  api.get<{ profile: Profile; success: true }>('profile', {
    ...params?.options
  });
