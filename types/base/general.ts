export type Driver = "ZARINPAL" | "ZIBAL" | "NOVINPAL" | "PAYMENT4";

export type RequestType = "request" | "verify" | "inquiry";

export interface BaseResponse {
  code: number;
  message: string;
  success: boolean;
  data?: unknown;
  raw?: unknown;
}
