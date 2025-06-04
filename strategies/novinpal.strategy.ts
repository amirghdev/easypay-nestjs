import { BasePaymentStrategy } from "../types/payment.strategy";
import { NovinpalRequestOptions, NovinpalRequestResponse, NovinpalRequestResponseExtraData } from "../request/novinpal.request";
import { NovinpalVerifyOptions, NovinpalVerifyPaymentResponse, NovinpalVerifyPaymentResponseExtraData } from "../verify/novinpal.verify";
import { BaseRequestResponse } from "../request/request";
import { BaseVerifyResponse } from "../verify/verify";
import { InquiryOptions } from "../inquiry/inquiry";
import { BaseInquiryResponse } from "../inquiry/inquiry";
import axios, { AxiosError } from "axios";
import { NovinpalError } from "../types/novinpal.type";

export class NovinpalStrategy implements BasePaymentStrategy<NovinpalRequestResponseExtraData, NovinpalVerifyPaymentResponseExtraData, null> {
  API_URLS = {
    sandbox: "https://api.novinpal.ir/invoice",
    production: "https://api.novinpal.ir/invoice",
  };

  GATEWAY_URLS = {
    sandbox: "https://api.novinpal.ir/invoice/start",
    production: "https://api.novinpal.ir/invoice/start",
  };

  async requestPayment(options: NovinpalRequestOptions): Promise<BaseRequestResponse<NovinpalRequestResponseExtraData>> {
    const url = options.sandbox ? `${this.API_URLS.sandbox}/request` : `${this.API_URLS.production}/request`;
    const gatewayUrl = options.sandbox ? this.GATEWAY_URLS.sandbox : this.GATEWAY_URLS.production;

    try {
      const response = await axios.post<NovinpalRequestResponse>(url, {
        api_key: options.api_key,
        amount: options.amount,
        return_url: options.callbackUrl,
        order_id: options.order_id,
        card_number: options.card_number,
        mobile: options.mobile,
        description: options.description,
      });

      const isSuccess = response.data.status === 1;

      return {
        success: isSuccess,
        code: response.data.status,
        message: isSuccess ? "success" : response.data.errorDescription,
        data: {
          refId: +response.data.refId,
          url: `${gatewayUrl}/${response.data.refId}`,
        },
        raw: response.data,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return this.handleAxiosError(error);
      } else {
        return this.handleUnknownError(error);
      }
    }
  }

  async verifyPayment(options: NovinpalVerifyOptions): Promise<BaseVerifyResponse<NovinpalVerifyPaymentResponseExtraData>> {
    const url = options.sandbox ? `${this.API_URLS.sandbox}/verify` : `${this.API_URLS.production}/verify`;

    try {
      const response = await axios.post<NovinpalVerifyPaymentResponse>(url, {
        api_key: options.apiKey,
        ref_id: options.refId,
      });

      const isSuccess = response.data.status === 1;

      return {
        success: isSuccess,
        code: response.data.status,
        message: isSuccess ? "success" : "failed",
        data: {
          refId: +response.data.refId,
          amount: response.data.amount,
          cardNumber: response.data.cardNumber,
          description: response.data.description,
          orderId: response.data.orderId,
          paidAt: response.data.paidAt,
          refNumber: response.data.refNumber,
          verifiedBefore: response.data.verifiedBefore,
        },
        raw: response.data,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return this.handleAxiosError(error as AxiosError);
      } else {
        return this.handleUnknownError(error);
      }
    }
  }

  inquiryPayment(options: InquiryOptions): Promise<BaseInquiryResponse<null>> {
    throw new Error("Novinpal does not support inquiry payment.");
  }

  private handleAxiosError(error: AxiosError): BaseRequestResponse<null> | BaseVerifyResponse<null> {
    const errorData = error.response?.data as NovinpalError;
    if ("status" in errorData) {
      return {
        success: false,
        code: +errorData.errorCode,
        message: errorData.errorDescription,
        data: null,
        raw: errorData,
      };
    } else {
      return {
        success: false,
        code: +errorData.code,
        message: errorData.message,
        data: null,
        raw: errorData,
      };
    }
  }

  private handleUnknownError(error: unknown): BaseRequestResponse<null> | BaseVerifyResponse<null> {
    return {
      success: false,
      code: 500,
      message: "unknown error",
      data: null,
      raw: error,
    };
  }
}
