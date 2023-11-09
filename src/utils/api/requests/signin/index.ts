import type { AxiosRequestConfig } from 'axios';
import { api } from '../../instance';

interface PostSigninParams {
  email: string;
  password: string;
}

export const postSignin = (params: PostSigninParams, options?: AxiosRequestConfig) =>
  api.post('signin', params, {
    ...options
  });
