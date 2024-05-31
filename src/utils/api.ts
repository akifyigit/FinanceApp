import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";

import { API_URL } from "../constant/variables";

interface IConfig {
  method?: AxiosRequestConfig["method"];
  headers?: AxiosRequestConfig["headers"];
  data?: AxiosRequestConfig["data"];
}

interface IParams {
  baseUrl: string;
  path: string;
}

const axiosParameterBuilder = (config: IConfig) => {
  const { method = "GET", headers = {}, data = {} } = config;

  const token = localStorage.getItem("clientToken");
  const headerParameters: RawAxiosRequestHeaders = {
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
    ...headers,
  };

  let requestData = data;

  if (["POST", "PATCH", "PUT", "DELETE"].includes(method)) {
    requestData = JSON.stringify(data);
  }
  return {
    data: requestData,
    headers: headerParameters,
    method,
  };
};

const apiURLBuilder = (params: IParams) => {
  const { baseUrl = API_URL, path = "" } = params;
  return `${baseUrl}/${path}`;
};

export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: API_URL }): BaseQueryFn =>
  async (queryParams) => {
    try {
      const { path, ...rest } = queryParams;

      const params = axiosParameterBuilder(rest);
      const requestUrl = apiURLBuilder({ baseUrl, path });

      const response = await axios(requestUrl, {
        ...params,
        responseType: rest.download ? "blob" : undefined,
      });
      if (response.status === 401) {
        localStorage.clear();
        window.location.assign("/");
      }
      return { data: response.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      if (err?.response?.status === 401) {
        localStorage.clear();
        window.location.assign("/");
      }
      return {
        error: {
          success: err.response?.status,
          value: err.response?.data || err.message,
        },
      };
    }
  };

export const apiResHandler = (
  promise: any,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  callback: any = () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  failCallback: any = () => {}
) => {
  promise
    .then((res: any) => {
      const { data, error } = res;
      if (!data && error)
        throw new Error(
          error?.value?.message ||
            error?.data?.message ||
            "Something went wrong!"
        );
      const { value, success = true } = data;

      if (!success) {
        failCallback?.({ message: value.message });
        return;
      }
      callback?.(data);
    })
    .catch((err: { message: string }) => {
      const { message } = err;
      failCallback?.({ message });
    });
};
