import { ZarinpalInquiryOptions } from "./zarinpal.inquiry";
import { ZibalInquiryOptions } from "./zibal.inquiry";

export type InquiryDriver = "ZARINPAL" | "ZIBAL";

export type InquiryOptions = ZarinpalInquiryOptions | ZibalInquiryOptions;
