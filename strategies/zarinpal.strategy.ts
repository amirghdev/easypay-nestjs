import { BasePaymentStrategy } from "types/payment.strategy";
import { BaseRequestResponse } from "../request/request";
import { ZarinpalRequestOptions, ZarinpalRequestResponse, ZarinpalRequestResponseExtraData } from "../request/zarinpal.request";
import { ZarinpalVerifyOptions, ZarinpalVerifyPaymentResponse, ZarinpalVerifyPaymentResponseExtraData } from "../verify/zarinpal.verify";
import {
  ZarinpalInquiryOptions,
  ZarinpalInquiryResponse,
  ZarinpalInquiryResponseError,
  ZarinpalInquiryResponseExtraData,
} from "../inquiry/zarinpal.inquiry";
import { BaseVerifyResponse } from "../verify/verify";
import { BaseInquiryResponse } from "../inquiry/inquiry";
import axios, { AxiosError } from "axios";
import { RequestType } from "../types/general.type";

export class ZarinpalStrategy
  implements BasePaymentStrategy<ZarinpalRequestResponseExtraData, ZarinpalVerifyPaymentResponseExtraData, ZarinpalInquiryResponseExtraData>
{
  API_URLS = {
    sandbox: "https://sandbox.zarinpal.com/pg/v4/payment",
    production: "https://api.zarinpal.com/pg/v4/payment",
  };

  GATEWAY_URLS = {
    sandbox: "https://sandbox.zarinpal.com/pg/StartPay",
    production: "https://payment.zarinpal.com/pg/StartPay",
  };

  async requestPayment(options: ZarinpalRequestOptions): Promise<BaseRequestResponse<ZarinpalRequestResponseExtraData>> {
    try {
      const url = options.sandbox ? `${this.API_URLS.sandbox}/request.json` : `${this.API_URLS.production}/request.json`;
      const gatewayUrl = options.sandbox ? this.GATEWAY_URLS.sandbox : this.GATEWAY_URLS.production;

      const request = await axios.post<ZarinpalRequestResponse>(url, {
        merchant_id: options.merchantId,
        amount: options.amount,
        callback_url: options.callbackUrl,
        description: options.description,
        metadata: options.metadata,
      });

      return {
        success: true,
        code: request.data.data.code,
        message: request.data.data.message,
        raw: request.data,
        data: {
          authority: request.data.data.authority,
          fee: request.data.data.fee,
          fee_type: request.data.data.fee_type,
          url: `${gatewayUrl}/${request.data.data.authority}`,
        },
      };
    } catch (error) {
      return this.handleError(error as AxiosError, "request");
    }
  }

  async verifyPayment(options: ZarinpalVerifyOptions): Promise<BaseVerifyResponse<ZarinpalVerifyPaymentResponseExtraData>> {
    try {
      const url = options.sandbox ? `${this.API_URLS.sandbox}/verify.json` : `${this.API_URLS.production}/verify.json`;
      const request = await axios.post<ZarinpalVerifyPaymentResponse>(url, {
        merchant_id: options.merchantId,
        authority: options.authority,
        amount: options.amount,
      });

      return {
        success: true,
        code: request.data.data.code,
        message: request.data.data.message,
        raw: request.data,
        data: {
          fee: request.data.data.fee,
          fee_type: request.data.data.fee_type,
          card_hash: request.data.data.card_hash,
          card_pan: request.data.data.card_pan,
          ref_id: request.data.data.ref_id,
        },
      };
    } catch (error) {
      return this.handleError(error as AxiosError, "verify");
    }
  }

  async inquiryPayment(options: ZarinpalInquiryOptions): Promise<BaseInquiryResponse<ZarinpalInquiryResponseExtraData>> {
    try {
      const url = options.sandbox ? `${this.API_URLS.sandbox}/inquiry.json` : `${this.API_URLS.production}/inquiry.json`;
      const request = await axios.post<ZarinpalInquiryResponse>(url, {
        merchant_id: options.merchant_id,
        authority: options.authority,
      });

      return {
        success: true,
        code: request.data.data.code,
        message: request.data.data.message,
        raw: request.data,
        data: {
          status: request.data.data.status,
        },
      };
    } catch (error) {
      return this.handleError(error as AxiosError, "inquiry");
    }
  }

  private handleError(error: AxiosError, type: RequestType) {
    switch (type) {
      case "request":
        const requestResponse = error?.response?.data as ZarinpalRequestResponse;
        return {
          success: false,
          data: null,
          code: requestResponse?.errors?.code,
          message: requestResponse?.errors?.message,
          raw: requestResponse,
        };

      case "verify":
        const verifyResponse = error?.response?.data as ZarinpalVerifyPaymentResponse;
        return {
          success: false,
          data: null,
          code: verifyResponse?.errors?.code,
          message: verifyResponse?.errors?.message,
          raw: verifyResponse,
        };

      case "inquiry":
        const inquiryResponse = error?.response?.data as ZarinpalInquiryResponseError;

        let code: number;
        if (inquiryResponse.errors.authority) {
          code = -54;
        } else {
          code = -10;
        }
        return {
          success: false,
          data: null,
          code: code,
          message: inquiryResponse?.message,
          raw: inquiryResponse,
        };
    }
  }
}
