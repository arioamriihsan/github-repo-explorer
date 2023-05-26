import { AxiosResponse } from 'axios';
import http from './http';
import { API_URL } from './constant';
import { ApiSuccessResponse } from './types/response.types';

export const getUsers = (params: {
  q: string;
  page: number;
  per_page: number;
}): Promise<AxiosResponse<ApiSuccessResponse>> => http.get(API_URL, params);
