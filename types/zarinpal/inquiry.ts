export interface ZarinpalInquiryPaymentOptions {
  authority: string;
  merchantId: string;
}

export interface ZarinpalInquiryOptions extends ZarinpalInquiryPaymentOptions {
  // driver: "ZARINPAL";
  sandbox: boolean;
}

export interface ZarinpalInquiryResponse {
  data: ZarinpalInquiryResponseData;
  errors: ZarinpalInquiryResponseError;
}

export interface ZarinpalInquiryResponseData {
  status: "VERIFIED " | "PAID " | "IN_BANK " | "FAILED " | "REVERSED ";
  code: number;
  message: string;
}

export interface ZarinpalInquiryResponseError {
  message: string;
  errors: {
    authority: string[];
    merchant_id: string[];
  };
}

export interface ZarinpalInquiryResponseExtraData {
  status: "VERIFIED " | "PAID " | "IN_BANK " | "FAILED " | "REVERSED ";
}
