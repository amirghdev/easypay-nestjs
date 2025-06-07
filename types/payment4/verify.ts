import { Payment4Currency } from "./base";

export interface Payment4VerifyOptions {
  paymentUid: string;
  amount: number;
  currency: Payment4Currency;
}

export interface Payment4VerifyResponse {
  paymentStatus: Payment4PaymentStatus;
  amountDifference?: string;
  verified: boolean;
}

export type Payment4PaymentStatus = "PENDING" | "ACCEPTABLE" | "MISMATCH";

export interface Payment4VerifyResponseExtraData {
  amountDifference: string;
}
