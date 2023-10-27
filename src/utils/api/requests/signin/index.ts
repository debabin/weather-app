import type { Options } from 'ky';
import { api } from '../../instance';

interface PostSigninParams {
  email: string;
  password: string;
}

export const postSignin = (params: PostSigninParams, options?: Options) =>
  api.post('signin', {
    json: params,
    ...options
  });
