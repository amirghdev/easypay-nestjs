import { ZarinpalInquiryOptions, ZarinpalInquiryResponseExtraData } from "./zarinpal.inquiry";
import { ZibalInquiryOptions, ZibalInquiryResponseExtraData } from "./zibal.inquiry";

export type InquiryDriver = "ZARINPAL" | "ZIBAL";

export type InquiryOptions = ZarinpalInquiryOptions | ZibalInquiryOptions;

export type InquiryData = ZibalInquiryResponseExtraData | ZarinpalInquiryResponseExtraData;

export interface BaseInquiryResponse<T> {
  success: boolean;
  code?: number;
  message?: string;
  data?: T;
  raw?: unknown;
}
