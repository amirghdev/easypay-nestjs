import { BasePaymentStrategy } from "types/payment.strategy";
import { BaseRequestResponse, RequestOptions } from "../types/base/request";
import { ZarinpalRequestOptions, ZarinpalRequestResponse, ZarinpalRequestResponseExtraData } from "../types/zarinpal/request";
import { ZarinpalVerifyOptions, ZarinpalVerifyPaymentResponse, ZarinpalVerifyPaymentResponseExtraData } from "../types/zarinpal/verify";
import {
  ZarinpalInquiryOptions,
  ZarinpalInquiryResponse,
  ZarinpalInquiryResponseError,
  ZarinpalInquiryResponseExtraData,
} from "../types/zarinpal/inquiry";
import { BaseVerifyResponse, VerifyOptions } from "../types/base/verify";
import { BaseInquiryResponse, InquiryOptions } from "../types/base/inquiry";
import axios, { AxiosError } from "axios";
import { RequestType } from "../types/base/general";
import { Logger } from "class/logger";

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

  private logger = new Logger("ZARINPAL");

  async request(data: RequestOptions): Promise<BaseRequestResponse<ZarinpalRequestResponseExtraData>> {
    const options = data.options as ZarinpalRequestOptions;

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
      this.logger.error("request", error);

      if (error instanceof AxiosError) {
        return this.handleError(error as AxiosError, "request");
      } else {
        return {
          success: false,
          code: 500,
          message: "خطایی نامشخص رخ داده است",
          data: null,
          raw: JSON.stringify(error.response),
        };
      }
    }
  }

  async verify(data: VerifyOptions): Promise<BaseVerifyResponse<ZarinpalVerifyPaymentResponseExtraData>> {
    const options = data.options as ZarinpalVerifyOptions;

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
      this.logger.error("verify", error);

      if (error instanceof AxiosError) {
        return this.handleError(error as AxiosError, "verify");
      } else {
        return {
          success: false,
          code: 500,
          message: "خطایی نامشخص رخ داده است",
          data: null,
          raw: JSON.stringify(error.response),
        };
      }
    }
  }

  async inquiry(data: InquiryOptions): Promise<BaseInquiryResponse<ZarinpalInquiryResponseExtraData>> {
    const options = data.options as ZarinpalInquiryOptions;

    try {
      const url = options.sandbox ? `${this.API_URLS.sandbox}/inquiry.json` : `${this.API_URLS.production}/inquiry.json`;
      const request = await axios.post<ZarinpalInquiryResponse>(url, {
        merchant_id: options.merchantId,
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
      this.logger.error("inquiry", error);

      if (error instanceof AxiosError) {
        return this.handleError(error as AxiosError, "inquiry");
      } else {
        return {
          success: false,
          code: 500,
          message: "خطایی نامشخص رخ داده است",
          data: null,
          raw: JSON.stringify(error.response),
        };
      }
    }
  }

  private handleError(error: AxiosError, type: RequestType) {
    // Handle network errors (DNS, connection refused, etc.)
    if (!error.response) {
      return {
        success: false,
        data: null,
        code: 500,
        message: "خطا در اتصال به سرور پرداخت",
        raw: {
          error: error.message,
          code: error.code,
        },
      };
    }

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
