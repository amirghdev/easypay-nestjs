import { NovinpalRequestOptions, NovinpalRequestResponseExtraData } from "./novinpal.request";
import { ZarinpalRequestOptions, ZarinpalRequestResponseExtraData } from "./zarinpal.request";
import { ZibalRequestOptions, ZibalRequestResponseExtraData } from "./zibal.request";

export interface BaseRequestOptions {
  amount: number;
  callbackUrl: string;
  sandbox?: boolean;
  description?: string;
}

export type RequestOptions = ZarinpalRequestOptions | ZibalRequestOptions | NovinpalRequestOptions;

export interface BaseRequestResponse<T> {
  success: boolean;
  code?: number;
  message?: string;
  data?: T;
  raw?: unknown;
}

export interface RequestError {
  code: number;
  message?: string;
}

export type RequestData = ZarinpalRequestResponseExtraData | ZibalRequestResponseExtraData | NovinpalRequestResponseExtraData;
