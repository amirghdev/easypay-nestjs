export interface ZibalInquiryPaymentOptions {
  trackId: number;
  merchant: string;
}

export interface ZibalInquiryOptions extends ZibalInquiryPaymentOptions {
  driver: "ZIBAL";
  sandbox: boolean;
}

export interface ZibalInquiryResponse {
  createdAt?: Date;
  paidAt?: Date;
  verifiedAt?: Date;
  cardNumber: string;
  status: ZibalInquiryStatus;
  amount: number;
  refNumber: number;
  description: string;
  orderId?: string;
  wage: 0 | 1 | 2;
  result: ZibalInquiryResult;
  message: string;
}

export type ZibalInquiryStatus = -1 | -2 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 15 | 16 | 18;

export type ZibalInquiryResult = 100 | 102 | 103 | 104 | 203;

export interface ZibalInquiryResponseExtraData {
  createdAt?: Date;
  paidAt?: Date;
  verifiedAt?: Date;
  cardNumber: string;
  status: ZibalInquiryStatus;
  amount: number;
  refNumber: number;
  description: string;
  orderId?: string;
  wage: 0 | 1 | 2;
}

export interface ZibalInquiryResponseError {
  result: ZibalInquiryResult;
  message: string;
}
