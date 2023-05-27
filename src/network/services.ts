import { AxiosResponse } from 'axios';
import http from './http';
import endpoints from './endpoints';
import { ApiSuccessResponse } from './types/response.types';

export const getUsers = (params: {
  q: string;
  per_page: number;
}): Promise<AxiosResponse<ApiSuccessResponse>> =>
  http.get(endpoints.getUsers, params);

export const getRepos = (
  username: string,
  params: {
    per_page: number;
    sort: string;
  }
): Promise<AxiosResponse<ApiSuccessResponse>> =>
  http.get(endpoints.getRepos(username), params);
