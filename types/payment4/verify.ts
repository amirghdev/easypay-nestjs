import { Payment4Currency } from "./base";

export interface Payment4VerifyOptions {
  paymentUid: string;
  amount: number;
  currency: Payment4Currency;
  sandBox: boolean;
  apiKey: string;
}

export interface Payment4VerifyResponse {
  paymentStatus: Payment4PaymentStatus;
  amountDifference?: string;
  verified: boolean;
}

export type Payment4PaymentStatus = "PENDING" | "ACCEPTABLE" | "MISMATCH" | "EXPIRED";

export interface Payment4VerifyResponseExtraData {
  amountDifference: string;
}

export interface Payment4VerifyError {
  status: boolean;
  message: string;
  errorCode: 1001 | 1002 | 1003 | 1004 | 1005 | 1011 | 1012;
}
