import { AxiosResponse } from 'axios';
import http from './http';
import endpoints from './endpoints';
import {
  FetchUserSuccessResponse,
  FetchRepoSuccessResponse
} from './types/response.types';

export const getUsers = (params: {
  q: string;
  per_page: number;
}): Promise<AxiosResponse<FetchUserSuccessResponse>> =>
  http.get(endpoints.getUsers, params);

export const getRepos = (
  username: string,
  params: {
    per_page: number;
    sort: string;
  }
): Promise<AxiosResponse<FetchRepoSuccessResponse[]>> =>
  http.get(endpoints.getRepos(username), params);
