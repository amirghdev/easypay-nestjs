import { NovinpalVerifyOptions } from "./novinpal.verify";
import { ZarinpalVerifyOptions } from "./zarinpal.verify";
import { ZibalVerifyOptions } from "./zibal.verify";

export interface BaseVerifyOptions {
  sandbox?: boolean;
}

export type VerifyOptions = ZarinpalVerifyOptions | ZibalVerifyOptions | NovinpalVerifyOptions;

export interface BaseVerifyResponse {
  code: number;
  message: string;
  success: boolean;
  data?: unknown;
  raw?: unknown;
}
