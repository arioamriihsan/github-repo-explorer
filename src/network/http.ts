import axios, { AxiosRequestConfig } from 'axios';
import { serializeParam } from './utils';
import { API_TIME_OUT, API_URL } from './constant';

/**
 * Create Axios Instance with default
 */
export const apiInstance = axios.create({
  timeout: API_TIME_OUT,
  baseURL: API_URL,
});

/**
 * handle HTTP GET to RestAPI
 */
export const get = <T = any>(
  endpoint: string,
  queryParam: any = {},
  config?: AxiosRequestConfig
) => {
  /**
   * Url endpoint
   */
  let url = endpoint;
  /**
   * Add query param when `queryParam` is given
   */
  if (queryParam && Object.keys(queryParam).length > 0) {
    url = url + '?' + serializeParam(queryParam);
  }

  const newConfig: AxiosRequestConfig = {
    // attach config from param function
    ...config,
    headers: {
      ...config?.headers,
      'content-type': 'application/json',
    },
  };

  return apiInstance.get<T>(url, newConfig);
};

const http = { get };

export default http;