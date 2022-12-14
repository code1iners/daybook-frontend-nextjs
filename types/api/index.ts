import type { AxiosHeaders } from "axios";

export interface ApiResponse<T = any> {
  ok: boolean;
  code: number;
  data: T;
  message?: string;
}

export interface CoreResponse<T> {
  data: ApiResponse<T>;
  config: any;
  headers: AxiosHeaders;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}
