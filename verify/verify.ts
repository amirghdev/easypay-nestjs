import { NovinpalVerifyOptions, NovinpalVerifyPaymentResponseExtraData } from "./novinpal.verify";
import { ZarinpalVerifyOptions, ZarinpalVerifyPaymentResponseExtraData } from "./zarinpal.verify";
import { ZibalVerifyOptions, ZibalVerifyPaymentResponseExtraData } from "./zibal.verify";

export interface BaseVerifyOptions {
  sandbox?: boolean;
}

export type VerifyOptions = ZarinpalVerifyOptions | ZibalVerifyOptions | NovinpalVerifyOptions;

export interface BaseVerifyResponse<T extends VerifyData> {
  code: number;
  message: string;
  success: boolean;
  data?: T;
  raw?: unknown;
}

export type VerifyData = ZarinpalVerifyPaymentResponseExtraData | ZibalVerifyPaymentResponseExtraData | NovinpalVerifyPaymentResponseExtraData;
