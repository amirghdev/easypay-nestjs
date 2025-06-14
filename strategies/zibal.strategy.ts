import { BasePaymentStrategy } from "../types/payment.strategy";
import { ZibalRequestOptions, ZibalRequestResponse, ZibalRequestResponseExtraData } from "../types/zibal/request";
import { ZibalVerifyOptions, ZibalVerifyPaymentResponse, ZibalVerifyPaymentResponseExtraData } from "../types/zibal/verify";
import { ZibalInquiryOptions, ZibalInquiryResponse, ZibalInquiryResponseError, ZibalInquiryResponseExtraData } from "../types/zibal/inquiry";
import { BaseRequestResponse, RequestOptions } from "../types/base/request";
import { BaseVerifyResponse, VerifyOptions } from "../types/base/verify";
import { BaseInquiryResponse, InquiryOptions } from "../types/base/inquiry";
import axios, { AxiosError } from "axios";

export class ZibalStrategy
  implements BasePaymentStrategy<ZibalRequestResponseExtraData, ZibalVerifyPaymentResponseExtraData, ZibalInquiryResponseExtraData>
{
  API_URLS = {
    sandbox: "https://gateway.zibal.ir/v1",
    production: "https://gateway.zibal.ir/v1",
  };

  GATEWAY_URLS = {
    sandbox: "https://gateway.zibal.ir/start",
    production: "https://gateway.zibal.ir/start",
  };

  async request(data: RequestOptions): Promise<BaseRequestResponse<ZibalRequestResponseExtraData>> {
    const options = data.options as ZibalRequestOptions;

    const url = options.sandbox ? `${this.API_URLS.sandbox}/request` : `${this.API_URLS.production}/request`;
    const gatewayUrl = options.sandbox ? this.GATEWAY_URLS.sandbox : this.GATEWAY_URLS.production;

    try {
      const request = await axios.post<ZibalRequestResponse>(url, {
        merchant: options.merchant,
        amount: options.amount,
        callbackUrl: options.callbackUrl,
        description: options.description ?? undefined,
        orderId: options.orderId ?? undefined,
        mobile: options.mobile ?? undefined,
        allowedCards: options.allowedCards ?? undefined,
        ledgerId: options.ledgerId ?? undefined,
        nationalCode: options.nationalCode ?? undefined,
        checkMobileWithCard: options.checkMobileWithCard ?? undefined,
      });

      const isSuccess = request.data.result === 100;

      return {
        success: isSuccess,
        code: request.data.result,
        message: request.data.message,
        data: isSuccess
          ? {
              trackId: request.data.trackId,
              url: `${gatewayUrl}/${request.data.trackId}`,
            }
          : null,
        raw: request.data,
      };
    } catch (error) {
      return {
        success: false,
        code: 500,
        message: "خطایی نامشخص رخ داده است",
        data: null,
        raw: JSON.stringify(error.response),
      };
    }
  }

  async verify(data: VerifyOptions): Promise<BaseVerifyResponse<ZibalVerifyPaymentResponseExtraData>> {
    const options = data.options as ZibalVerifyOptions;

    const url = options.sandbox ? `${this.API_URLS.sandbox}/verify` : `${this.API_URLS.production}/verify`;

    try {
      const request = await axios.post<ZibalVerifyPaymentResponse>(url, {
        merchant: options.merchant,
        trackId: options.trackId,
      });

      const isSuccess = request.data.result === 100 || request.data.result === 201;

      return {
        success: isSuccess,
        code: request.data.result,
        message: request.data.message,
        data: isSuccess
          ? {
              amount: request.data.amount,
              cardNumber: request.data.cardNumber,
              description: request.data.description,
              orderId: request.data.orderId,
              paidAt: request.data.paidAt,
              refNumber: request.data.refNumber,
              status: request.data.status,
            }
          : null,
        raw: request.data,
      };
    } catch (error) {
      return {
        success: false,
        code: 500,
        message: "خطایی نامشخص رخ داده است",
        data: null,
        raw: JSON.stringify(error.response),
      };
    }
  }

  async inquiry(data: InquiryOptions): Promise<BaseInquiryResponse<ZibalInquiryResponseExtraData>> {
    const options = data.options as ZibalInquiryOptions;

    const url = options.sandbox ? `${this.API_URLS.sandbox}/inquiry` : `${this.API_URLS.production}/inquiry`;

    try {
      const request = await axios.post<ZibalInquiryResponse>(url, {
        merchant: options.merchant,
        trackId: options.trackId,
      });

      return {
        success: true,
        code: request.data.result,
        message: request.data.message,
        data: {
          amount: request.data.amount,
          cardNumber: request.data.cardNumber,
          description: request.data.description,
          orderId: request.data.orderId,
          paidAt: request.data.paidAt,
          refNumber: request.data.refNumber,
          status: request.data.status,
          wage: request.data.wage,
          createdAt: request.data.createdAt,
          verifiedAt: request.data.verifiedAt,
        },
        raw: request.data,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = error?.response?.data as ZibalInquiryResponseError;

        return {
          success: false,
          code: errorData.result,
          message: errorData.message,
          data: null,
          raw: error.response.data,
        };
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
}
