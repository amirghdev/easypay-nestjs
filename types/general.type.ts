export type Driver = "ZARINPAL" | "ZIBAL" | "NOVINPAL";

export type RequestType = "request" | "verify" | "inquiry";

export interface BaseResponse {
  code: number;
  message: string;
  success: boolean;
  data?: unknown;
  raw?: unknown;
}
