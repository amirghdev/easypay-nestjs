export type Driver = "ZARINPAL" | "ZIBAL" | "NOVINPAL" | "BITPAY";

export type RequestType = "request" | "verify" | "inquiry";

export interface BaseResponse {
  code: number;
  message: string;
  success: boolean;
  data?: unknown;
  raw?: unknown;
}
